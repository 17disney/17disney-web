<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.ds-map {
  width: 100%;
  height: 400px;
  position: relative;
  color: #FFF;

  &__cover {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    background: rgba($color-primary, 0.4);
  }

  h1 {
    font-weight: 500;
  }

  &__icon {
    font-size: 30px;
  }

  .leaflet-control-container {
    display: none;
  }
}
</style>

<template>
  <div class="ds-map">
    <div class="ds-map__cover">
      <div class="container">
        <div class="ds-map__icon icon--pep icon__shanghai-disney-resort"></div>
        <h1>上海迪士尼乐园</h1>
      </div>
    </div>
    <v-map :crs="crsBaidu" ref="map" :zoom="18" :min-zoom=5 :max-zoom=18 :center="center"></v-map>
  </div>
</template>

<script>
import { handleId } from '@/utils/tool'
import crsBaidu from '@/lib/crs.baidu'
import webdogTileLayer from '@/lib/webdogTileLayer'

export default {
  name: 'Index',
  components: {
  },
  computed: {

  },
  data() {
    return {
      crsBaidu,
      center: [31.1492, 121.6667],
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
    let map = this.$refs.map.mapObject
    let url = 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/shdr-baidu/13/{z}/{x}/{y}.jpg'
    let options = {
      getUrlArgs: (tilePoint) => {
        return {
          z: tilePoint.z,
          x: tilePoint.x + Math.pow(2, tilePoint.z - 1),
          y: tilePoint.y + Math.pow(2, tilePoint.z - 1)
        }
      }
    }
    webdogTileLayer(url, options).addTo(map)
  },
  created() {
  }
}
</script>

