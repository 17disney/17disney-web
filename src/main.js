import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vue2Leaflet from 'vue2-leaflet'
import store from './store'

import 'leaflet/dist/leaflet.css'
import '@/style/iconfont.css'
import '@/style/pepmdx-icons.css'
import '@/style/disney/index.less'

// Vue.config.productionTip = false
import Ds from './disney-ui/src/index'

Vue.use(Vuex)
Vue.use(Ds)

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
