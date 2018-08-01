import moment from 'moment'

const date = {
  state: {
    date: {
      today:
    },
    list: []
  },
  getters: {
    dataFilter: state => {}
  },
  mutations: {
    SET_DATA: (state, data) => {}
  },
  actions: {
    initDate: ({ commit }, data) => {

      const today = moment()
    }
  }
}

export default date
