import Vue from 'vue'

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
      commit('SET_LOCALE', locale)
    }
  }
}

export default app
