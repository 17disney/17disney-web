import Vue from 'vue'
import Lockr from 'lockr'

const app = {
  state: {
    locale: null
  },
  mutations: {
    SET_LOCALE: (state, locale) => {
      Vue.config.lang = locale
      state.locale = locale
    }
  },
  actions: {
    setLocale: ({ commit }, locale) => {
      Lockr.set('locale', locale)
      commit('SET_LOCALE', locale)
    }
  }
}

export default app
