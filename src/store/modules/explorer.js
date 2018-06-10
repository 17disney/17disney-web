import Local from 'package/17disney-common/const/local'
import WaitTimes from 'package/17disney-common/api/wait-times'
import { lineToObject } from '@/utils/tool'
import Lockr from 'lockr'

const explorer = {
  state: {
    local: null,
    utc: null,
    attList: []
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
      const { utc } = Local.find(_ => _.value === data)
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
    }
  },

  actions: {
    // 获取项目列表
    async getDestinationsList({ commit, state }) {
      const data = await WaitTimes.destinations(state.local, {
        type: 'attraction'
      })
      if (data) {
        commit('SET_ATT_LIST', data)
      }
    },
    // 设置地区
    setLocal({ commit }, data) {
      Lockr.set('local', data)
      commit('SET_LOCAL', data)
    }
  }
}

export default explorer
