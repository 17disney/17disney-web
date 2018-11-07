import Container from './Container'

Container.install = (Vue) => {
  Vue.component(Container.name, Container)
}

export default Container
