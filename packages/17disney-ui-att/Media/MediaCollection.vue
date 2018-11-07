<style lang='stylus'>
.att-media-collection {
  border-radius: 5px;
  overflow: hidden;
  display: inline-block;
  font-size: 0;

  img {
    width: 100%;
  }

  &.is-timesguide {
    &.size-small {
      // width: 75px;
      // height: 150px;
    }
  }
}
</style>
<template>
  <div class="att-media-collection" :class="[typeClass, 'size-' + size]">
    <img :src="picUrl" alt="">
  </div>
</template>

<script>
import { TIMESGUIDE_TYPE_LIST } from 'packages/17disney-common/const/museum'

const NAME = 'att-media-collection'
const CDN = {
  small: 'imageMogr2/thumbnail/180x2000/gravity/North/crop/x360/format/jpg/interlace/1/blur/1x0/quality/75|imageslim'
}

export default {
  name: NAME,

  components: {},

  props: {
    url: String,
    type: [String, Number],
    size: {
      type: String,
      default: 'small'
    }
  },

  data() {
    return {
    }
  },

  computed: {
    picUrl() {
      return this.url + '?' + CDN[this.size]
    },
    typeClass() {
      return TIMESGUIDE_TYPE_LIST.find(_ => _.id === this.type)['class']
    }
  },

  mounted() { },

  methods: {}
}
</script>
