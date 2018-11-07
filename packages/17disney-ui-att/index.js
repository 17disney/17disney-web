import Icon from './Icon'
import List from './List'
import Map from './Map'
import Mark from './Mark'
import Media from './Media'
import Status from './Status'
import WaitTime from './WaitTime'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  const components = [Icon, List, Map, Mark, Media, Status, WaitTime]
  components.forEach(Component => {
    Component.install(Vue)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default {
  install
}
