import moment from 'moment'
import Explorer from '@/common/api/explorer'
import { lineToObject } from '@/utils/tool'
import attType from '@/common/data/att-type'
import playType from '@/common/data/play-type'
const explorer = {
  state: {
    local: 'shanghai',
    attList: [],
    attRawList: [],
    facetGroups: {},
    schedules: {},
    attType,
    playType
  },
  getters: {
    landList: (state, getters) => {
      return state.attList.filter(item => item.type === 'land')
    },
    attractionList: (state, getters) => {
      return state.attList.filter(item => item.type === 'attraction')
    },
    attListFilter: (state, getters) => (type, hotLevel = 0) => {
      return state.attList.filter(
        item => item.type === type && item.hotLevel >= hotLevel
      )
    },
    attRawListFilter: (state, getters) => type => {
      return state.attRawList.filter(item => item.type === type)
    },
    attFind: (state, getters) => aid => {
      return state.attList.find(item => item.aid === aid)
    }

  },
  mutations: {
    SET_LOCAL: (state, data) => {
      state.local = data
    },
    SET_FACET_GROUPS: (state, data) => {
      state.facetGroups = data
    },

    SET_ATT_LIST: (state, data) => {
      data.forEach(item => {
        const { id } = item
        item.aid = lineToObject(id)['__id__']
      })
      state.attList = data
    },

    SET_SCHEDULES: (state, data) => {
      let activities = []
      for (const item of data) {
        activities = activities.concat(item.body[0].activities)
      }
      data = {}
      activities.forEach(item => {
        const aid = lineToObject(item.id)['__id__']
        if (item.schedule && item.schedule.schedules) {
          data[aid] = item.schedule.schedules
        }
      })
      state.schedules = data
    }
  },
  actions: {
    // 获取项目列表
    async getDestinationsList({ commit, state }) {
      const data = await Explorer.destinations(state.local)
      if (data) {
        commit('SET_ATT_LIST', data)
      }
    },
    // 获取时间表
    async getSchedules({ commit, state }, date) {
      const data = await Explorer.schedulesPre(state.local)
      commit('SET_SCHEDULES', data)
    }
  }
}

export default explorer
