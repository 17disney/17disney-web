import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import Vue2Leaflet from 'vue2-leaflet'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/disney/index.styl'
import 'leaflet/dist/leaflet.css'
import ElementUI from 'element-ui'
import * as Filters from '@/common/filters'
// Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI, { locale })

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

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root'

  var name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
      (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

Vue.config.errorHandler = function(err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
