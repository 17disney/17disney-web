<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.ds-map {
  width: 100%;
  position: relative;
  color: #FFF;

  .leaflet-control-container {
    display: none;
  }
}
</style>

<template>
  <div class="ds-map">
    <v-map v-if="local === 'shanghai'" :crs="crsBaidu" ref="map" :zoom="18" :min-zoom=5 :max-zoom=18 :center="center"></v-map>
    <v-map v-else ref="map" :zoom="18" :min-zoom=5 :max-zoom=18 :center="center"></v-map>

  </div>
</template>

<script>
import { handleId } from '@/utils/tool'
import crsBaidu from '@/lib/crs.baidu'
import webdogTileLayer from '@/lib/webdogTileLayer'

const NAME = 'ds-map'

const TILE_LAYER = {
  shanghai: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/shdr-baidu/13/{z}/{x}/{y}.jpg',
  orlando: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/93/{z}/{x}/{y}.jpg',
  california: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/disneyland/38/{z}/{x}/{y}.jpg',
  hongkong: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/hkdl/18/{z}/{x}/{y}.jpg',
  paris: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/dlp/15/{z}/{x}/{y}.jpg'
}

export default {
  name: NAME,

  components: {
  },

  computed: {
  },

  props: {
    local: String,
    center: Array
  },

  data() {
    return {
      crsBaidu,
      popupOption: {
        autoClose: false,
        closeButton: false,
        minWidth: 300,
        className: 'att-popup'
      },
      tilelayerOptions: {
        tms: true
      }
    }
  },

  methods: {

  },
  mounted() {
    const { local } = this

    let options = {}
    if (local === 'shanghai') {
      options = {
        getUrlArgs: (tilePoint) => {
          return {
            z: tilePoint.z,
            x: tilePoint.x + Math.pow(2, tilePoint.z - 1),
            y: tilePoint.y + Math.pow(2, tilePoint.z - 1)
          }
        }
      }
    }

    const url = TILE_LAYER[local]
    const map = this.$refs.map.mapObject
    webdogTileLayer(url, options).addTo(map)
  },
  created() {
  }
}
</script>

