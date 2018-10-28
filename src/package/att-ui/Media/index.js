import Media from './Media'
import MediaCollection from './MediaCollection'

Media.install = Vue => {
  Vue.component(Media.name, Media)
  Vue.component(MediaCollection.name, MediaCollection)
}

export default Media
