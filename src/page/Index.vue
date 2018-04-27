<style lang="stylus">
</style>

<template>
  <div class="page">
    <ds-navbar fixed v-show="!hideTools" class="map-navbar ds-tab" v-model="attTypeTab.selectedId">
      <div class="wrapper" ref="wrapper">
        <ds-tab-item v-for="item in attTypeTab.list" :key="item.name" :id="item.id">{{item.name}}</ds-tab-item>
      </div>
    </ds-navbar>

    <div class="map-btn-float">
      <a @click="getWaits" class="btn">
        <icon name="refresh"></icon>
      </a>
      <a @click="showMode = 'list'" class="btn" v-if="showMode=='map'">
        <icon name="lists"></icon>
      </a>
      <a @click="showMode = 'map'" class="btn" v-if="showMode=='list'">
        <icon name="maps"></icon>
      </a>
    </div>
    <div class="map-warp">
      <v-map :crs="crsBaidu" ref="map" :zoom="18" :min-zoom=5 :max-zoom=18 :center="center">
        <v-marker v-for="item in list" :icon="item.icon" :key="item.id" :lat-lng="item.coordinates">
          <v-popup :options="popupOption">
            <div class="inner" @click="clickAtt(item.id)">
              <div class="att-popup__avatar">
                <img :src="item.finderListMobileSquare.url">
              </div>
              <div class="att-popup__body">
                <h3 class="att-popup__title">{{item.name}}</h3>
                <p class="att-popup__desc">{{item.landName}}</p>
                <attWaittime :item="item" :wait="waits[item.aid]"></attWaittime>
              </div>
            </div>
          </v-popup>
        </v-marker>
      </v-map>
    </div>
    <div v-show="showMode == 'list'" class="attlist-warp">
      <att-list :waits="waits" :list="list" :schedules="schedules"></att-list>
    </div>
  </div>
</template>

<script>
import icon from '@/components/icon'
import attList from '@/components/att-list'
import attWaittime from '@/components/att-waittime'
import { attTypeTab, attTypeIcon } from '@/common/park-arr'
import { mapActions, mapState } from 'vuex'
import { handleId } from '@/utils/tool'
import { Toast } from 'mint-ui';
import crsBaidu from '@/lib/crs.baidu'
import webdogTileLayer from '@/lib/webdogTileLayer'

import BScroll from 'better-scroll'

export default {
  name: 'Index',
  components: {
    icon, attList, attWaittime
  },
  computed: {
    ...mapState({
      list: state => state.park.list,
      waits: state => state.park.waits,
      schedules: state => state.park.schedules,
    })
  },
  data() {
    return {
      attTypeTab,
      crsBaidu,
      hideTools: false,
      showMode: 'map',
      center: [31.1492, 121.6667],
      popupOption: {
        autoClose: false,
        closeButton: false,
        minWidth: 300,
        className: 'att-popup'
        // closeOnClick: false
      },
      tilelayerOptions: {
        tms: true
      }
    }
  },
  watch: {
    'attTypeTab.selectedId': function (nVal, oVal) {
      this.$store.dispatch('getDestinationsList', nVal)
    },
    list: function (nVal, oVal) {
      this.$store.dispatch('getAttractionsWait')
    }
  },
  methods: {
    ...mapActions([
      'getDestinationsList'
    ]),

    clickAtt(id) {
      let [__id__, entityType, destination] = handleId(id)
      let url = `att?id=${__id__}&entityType=${entityType}&destination=${destination}`
      console.log(url)
      wx.miniProgram.navigateTo({ url })
    },
    getWaits() {
      this.$createToast({
        txt: 'this.toastTxt'
      }).show()
      this.$store.dispatch('getAttractionsWait')
    }
  },
  mounted() {
    // let map = L.map('mapid', {
    //   center: [31.1492, 121.6667],
    //   zoom: 17,
    //   maxZoom: 18,
    //   minZoom: 13,
    //   crs: crsBaidu
    // })
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
    let scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true
    })
  },
  created() {
    this.$store.dispatch('getDestinationsList', 'attraction')
    this.$store.dispatch('getSchedules')
  }
}
</script>

