import LOCAL from 'pkg/17disney-common/const/local'
import ATT_TYPE from 'pkg/17disney-common/const/att-type'
import WaitTimes from 'pkg/17disney-common/api/wait-times'
import { lineToObject } from '@/utils/tool'
import Lockr from 'lockr'
import moment from 'moment'
import LAND_NAME from 'pkg/17disney-common/const'

const explorer = {
  state: {
    local: null,
    utc: null,
    attList: [],
    waits: {},
    park: null,
    date: moment().format('YYYY-MM-DD')
  },

  getters: {
    attractionList: state => {
      return state.attList.filter(item => item.type === 'attraction')
    },
    // 项目过滤器
    attListFilter: state => (type, hotLevel = 0) => {
      // let hotLevel = 0
      let list = state.attList.filter(
        item => item.type === type
      )

      if (type === 'attraction') {
        list = list.filter(
          item => item.hotLevel >= 3
        )
      }
      return list
    },
    attFind: state => aid => {
      return state.attList.find(item => item.aid === aid)
    }
  },

  mutations: {
    // 设置地区
    SET_LOCAL: (state, data) => {
      const { utc } = LOCAL.find(_ => _.value === data)
      state.utc = utc
      state.local = data
    },
    // 设置项目列表
    SET_ATT_LIST: (state, data) => {
      data.forEach(item => {
        const { id } = item
        item.aid = lineToObject(id)['__id__']
      })
      state.attList = data
    },
    // 设置乐园数据
    SET_PARK: (state, data) => {
      const {flowList} = data
      const flow = flowList[flowList.length - 1][1]
      data.flow = flow
      state.park = data
    },
    // 设置等候时间
    SET_WAITS: (state, data) => {
      const waits = {}
      data.forEach(item => {
        waits[item.id] = item
      })

      state.attList.forEach(item => {
        let wait = waits[item.aid]
        if (
          wait &&
          wait['waitList'] &&
          wait.status == 'Operating' &&
          wait.waitList[0] &&
          wait.waitList[0][1] > 0
        ) {
          item.icon = L.divIcon({
            className: 'att-marker att-marker--detail',
            popupAnchor: [17, 17],
            iconAnchor: [20, 55],
            html: `
              <div class="att-marker__content">
                <div class="att-marker__desc">等候</div>
                <div class="att-marker__num">${wait.waitList[0][1]}</div>
                <div class="att-marker__desc">分钟</div>
              </div>
              <div class="att-marker__tip__container">
                <div class="att-marker__tip">
              </div>
            `
          })
        }
      })
      state.waits = waits
    }
  },

  actions: {
    // 获取项目列表
    async getDestinationsList({ commit, state }) {
      const data = await WaitTimes.destinations(state.local, {
        // type: 'attraction'
      })
      data.forEach(item => {
        // 提取坐标
        let _coordinates = null
        if (
          item.relatedLocations &&
          item.relatedLocations[0] &&
          item.relatedLocations[0]['coordinates'] &&
          item.relatedLocations[0]['coordinates'][0]
        ) {
          let coordinates = item.relatedLocations[0]['coordinates'][0]
          let { latitude, longitude } = coordinates
          coordinates = [latitude, longitude].map(parseFloat)
          _coordinates = coordinates
          item.coordinates = _coordinates
        }

        const iconData = ATT_TYPE.find(_ => _.id === item.type)

        if (iconData && iconData['icon']) {
          item.icon = L.divIcon({
            className:
              'att-marker att-marker--icon icon--pep icon__' + iconData['icon'],
            popupAnchor: [0, 14],
            iconAnchor: [17.5, 35]
          })
        }

        // 提取关联
        const { ancestors } = item
        ancestors.forEach(arr => {
          const { id, type } = arr
          if (type === 'land') {
            const _id = lineToObject(id)['__id__']
            item.landName = LAND_NAME[_id]
          }
        })
      })

      if (data) {
        commit('SET_ATT_LIST', data)
      }

      this.dispatch('getAttractionsWait')
    },
    // 设置地区
    setLocal({ commit }, data) {
      Lockr.set('local', data)
      commit('SET_LOCAL', data)
    },
    // 获取等待时间
    async getAttractionsWait({ commit, state }) {
      const data = await WaitTimes.waitsHome(state.local, state.date)
      commit('SET_WAITS', data)
    },
    async getParkDate({ commit, state}, date = state.date) {
      const data = await WaitTimes.parkDate(state.local, date)
      commit('SET_PARK', data)
    }
  }
}

export default explorer
