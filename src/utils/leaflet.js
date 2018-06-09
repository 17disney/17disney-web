import Vue2Leaflet from 'vue2-leaflet'

export default function init(Vue) {
  Vue.component('v-map', Vue2Leaflet.Map)
  Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
  Vue.component('v-marker', Vue2Leaflet.Marker)
  Vue.component('v-popup', Vue2Leaflet.Popup)
  Vue.component('v-tooltip', Vue2Leaflet.Tooltip)
}
