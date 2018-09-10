/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| Main
|
*/

import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'

// CSS
// import 'element-ui/lib/theme-chalk/index.css' // CDN
import '@/styles/disney/index.styl'
import 'leaflet/dist/leaflet.css'

// UI
import ElementUI from 'element-ui'
import DmUi from 'package/dm-ui'
import AttUi from 'package/att-ui'

Vue.use(ElementUI)
Vue.use(DmUi)
Vue.use(AttUi)

// Tools
import * as Filters from '@/common/filters'
import initLocale from './utils/locale'
import initLeaflet from './utils/leaflet'
import * as Api from 'pkg/17disney-common/api'

Vue.prototype.$Api = Api

initLocale(Vue)
initLeaflet(Vue)

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 错误提交
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

Vue.config.errorHandler = function (err, vm, info) {
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
