import Map from './Map'
import MapFloat from './MapFloat'
import AttMarker from './AttMarker'

Map.install = (Vue) => {
  Vue.component(Map.name, Map)
  Vue.component(MapFloat.name, MapFloat)
  Vue.component(AttMarker.name, AttMarker)
}

export default Map
