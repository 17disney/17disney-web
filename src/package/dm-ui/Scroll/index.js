// import Scroll from './Scroll'
import Scroll from 'vue-perfect-scrollbar'

Scroll.install = (Vue) => {
  Vue.component('dm-scroll', Scroll)
}

export default Scroll
