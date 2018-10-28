import Card from './Card'

Card.install = (Vue) => {
  Vue.component(Card.name, Card)
}

export default Card
