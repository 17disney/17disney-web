import Navbar from '../../components/navbar/navbar.vue'

Navbar.install = function (Vue) {
  Vue.component(Navbar.name, Navbar)
}

export default Navbar
