import Vue from 'vue'
import Lockr from 'lockr'

const app = {
  state: {
    locale: null,
    init: false
  },
  mutations: {
    // 设置语言
    SET_LOCALE: (state, locale) => {
      Vue.config.lang = locale
      state.locale = locale
      state.init = true
    }
  },
  actions: {
    // 设置语言
    setLocale: ({ commit }, locale) => {
      Lockr.set('locale', locale)
      commit('SET_LOCALE', locale)
    }
  }
}

export default app
