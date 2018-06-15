import LOCAL from 'package/17disney-common/const/local'
import ATT_TYPE from 'package/17disney-common/const/att-type'
import WaitTimes from 'package/17disney-common/api/wait-times'
import { lineToObject } from '@/utils/tool'
import Lockr from 'lockr'

const explorer = {
  state: {
    local: null,
    utc: null,
    attList: [],
    waits: {}
  },

  getters: {
    attractionList: state => {
      return state.attList.filter(item => item.type === 'attraction')
    },
    attListFilter: state => type => {
      const hotLevel = 3
      return state.attList.filter(
        item => item.type === type && item.hotLevel >= hotLevel
      )
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
    // 设置等候时间
    SET_WAITS: (state, data) => {
      const waits = {}
      data.forEach(item => {
        waits[item.id] = item
      })

      state.attList.forEach(item => {
        let wait = waits[item.aid]
        if (wait && wait['waitList'] && wait.status == 'Operating') {
          item.icon = L.divIcon({
            className: 'att-marker att-marker--wait',
            popupAnchor: [17, 57],
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
        type: 'attraction'
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
          coordinates[0] = coordinates[0] + 0.0003
          coordinates[1] = coordinates[1] - 0.0001
          _coordinates = coordinates
          item.coordinates = _coordinates
        }

        const iconData = ATT_TYPE.find(_ => _.id === item.type)

        if (iconData && iconData['icon']) {
          item.icon = L.divIcon({
            className:
              'att-marker att-marker--icon icon--pep icon__' + iconData['icon'],
            popupAnchor: [12, 42]
          })
        }
      })

      if (data) {
        commit('SET_ATT_LIST', data)
      }
    },
    // 设置地区
    setLocal({ commit }, data) {
      Lockr.set('local', data)
      commit('SET_LOCAL', data)
    },
    // 获取等待时间
    async getAttractionsWait({ commit, state }, date) {
      const data = await WaitTimes.waitsHome(state.local, date)
      commit('SET_WAITS', data)
    }
  }
}

export default explorer
