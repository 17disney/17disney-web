import List from './List'
import ListItem from './ListItem'

List.install = (Vue) => {
  Vue.component(List.name, List)
  Vue.component(ListItem.name, ListItem)
}

export default List
