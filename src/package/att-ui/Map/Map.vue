<style lang="stylus">
@require '../../../styles/disney/var/color.styl';

.ds-map {
  width: 100%;
  position: relative;
  color: #FFF;

  .leaflet-control-attribution, .leaflet-control-container {
    display: none;
  }
}
</style>

<template>
  <div class="ds-map">
    <v-map v-if="local === 'shanghai'" :crs="crsBaidu" ref="map" :zoom="18" :min-zoom=12 :max-zoom=20 :center="center" :options="options">
      <marker-cluster :options="clusterOptions">
        <slot></slot>
      </marker-cluster>
    </v-map>
    <v-map v-else ref="map" :zoom="18" :min-zoom=14 :max-zoom=20 :center="center" :options="options">
      <marker-cluster :options="clusterOptions">
        <slot></slot>
      </marker-cluster>
    </v-map>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Ds-Map
| 迪士尼地图组件
*/

/* eslint-disable */
import crsBaidu from './lib/crs.baidu'
import webdogTileLayer from './lib/webdogTileLayer'
import MarkerCluster from './MarkerCluster'

const NAME = 'att-map'
const TILE_LAYER = {
  shanghai: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/shdr-baidu/16/{z}/{x}/{y}.jpg',
  orlando: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/93/{z}/{x}/{y}.jpg',
  california: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/disneyland/38/{z}/{x}/{y}.jpg',
  hongkong: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/hkdl/18/{z}/{x}/{y}.jpg',
  paris: 'https://secure.parksandresorts.wdpromedia.com/media/maps/prod/dlp/15/{z}/{x}/{y}.jpg'
}

export default {
  name: NAME,

  components: {
    MarkerCluster
  },

  props: {
    local: String,
    center: Array
  },

  data() {
    return {
      options: {
        zoomSnap: 0.05, // 设置无极缩放
        touchZoom: 'center', // 双指缩放地图的同时锁定地图移动
        bounceAtZoomLimits: false // 关闭回弹
      },
      crsBaidu,
      popupOption: {
        autoClose: false,
        closeButton: false,
        minWidth: 300,
        className: 'att-popup'
      },
      tilelayerOptions: {
        tms: true
      },
      clusterOptions: {
        animate: false,
        maxClusterRadius: 45, // 合并半径
        showCoverageOnHover: false,
        // disableClusteringAtZoom: 20
        iconCreateFunction(cluster) {
          return L.divIcon({
            className: 'att-marker att-marker--more',
            html: `
              <div class="att-marker__child-1"></div>
              <div class="att-marker__child-2"></div>
              <div class="att-marker__content">
                <div class="att-marker__num">${cluster.getChildCount()}</div>
              </div>
              <div class="att-marker__tip__container">
                <div class="att-marker__tip">
              </div>
            `
          })
        }
      }
    }
  },

  mounted() {
    const { local } = this
    const url = TILE_LAYER[local]
    const map = this.$refs.map.mapObject
    const options = {
      maxZoom: 20
    }

    if (local === 'shanghai') {
      options.getUrlArgs = (tilePoint) => {
        return {
          z: tilePoint.z,
          x: tilePoint.x + Math.pow(2, tilePoint.z - 1),
          y: tilePoint.y + Math.pow(2, tilePoint.z - 1)
        }
      }
    }

    webdogTileLayer(url, options).addTo(map)
  },

  methods: {}
}
</script>

