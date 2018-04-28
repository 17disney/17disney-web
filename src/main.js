import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vue2Leaflet from 'vue2-leaflet'
import store from './store'
import BaiduMap from 'vue-baidu-map'

import '@/styles/disney/index.styl'
import 'leaflet/dist/leaflet.css'

// Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(BaiduMap, {
  ak: 'AqG0eu7Q2IMGDdXgxlVTMlT136fAFnmS'
})
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-popup', Vue2Leaflet.Popup)
Vue.component('v-tooltip', Vue2Leaflet.Tooltip)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
