import Vue from 'vue'
import Vuex from 'vuex'
import explorer from './modules/explorer'
import app from './modules/app'
// import park from './modules/park'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    explorer,
    app,
    // park
  }
})

export default store
