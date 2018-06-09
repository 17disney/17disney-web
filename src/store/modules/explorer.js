import moment from 'moment'
import Local from 'package/17disney-common/const/local'
import WaitTimes from 'package/17disney-common/api/wait-times'
import { lineToObject } from '@/utils/tool'

const explorer = {
  state: {
    local: null,
    utc: null,
    date: moment().format('YYYY-MM-DD'),
    attList: []
  },

  getters: {
    attractionList: (state, getters) => {
      return state.attList.filter(item => item.type === 'attraction')
    },
    attListFilter: (state, getters) => type => {
      return state.attList.filter(item => item.type === type)
    },
    attFind: (state, getters) => aid => {
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
      commit('SET_LOCAL', data)
    }
  }
}

export default explorer
