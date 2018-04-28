import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import Vue2Leaflet from 'vue2-leaflet'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/disney/index.styl'
import 'leaflet/dist/leaflet.css'
import ElementUI from 'element-ui'
import * as Filters from '@/common/filters'
// Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI, { locale })
Vue.use(BaiduMap, {
  ak: 'AqG0eu7Q2IMGDdXgxlVTMlT136fAFnmS'
})

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
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
