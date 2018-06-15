<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 32px;
}

.dm-main {
  flex: 1;
}

.ds-map {
  height: 600px;

  &-wrap {
    padding: 5px;
    // border-radius: 5px;
    border: 1px solid $color-light-grey-s;
    overflow: hidden;
  }
}
</style>
<template>
  <div class="container">
    <dm-main>
      <div class="ds-map-wrap">
        <ds-map v-if="local" :local="local" :center="localInfo.coordinates">

          <v-marker v-for="(item, index) in attractionList" :icon="item.icon" :key="index" :lat-lng="item.coordinates">
            <v-popup :options="popupOption">
              <div class="inner" @click="handleClickAtt(item.id)">
                <div class="att-popup__avatar">
                  <att-media :medias="item.medias"></att-media>
                </div>
                <div class="att-popup__body">
                  <h3 class="att-popup__title">{{item.name}}</h3>
                  <p class="att-popup__desc">{{item.landName}}</p>
                  <!-- <attWaittime :item="item" :wait="waits[item.aid]"></attWaittime> -->
                </div>
              </div>
            </v-popup>
          </v-marker>

        </ds-map>
      </div>
    </dm-main>
  </div>
</template>

<script>
import moment from 'moment'
import base from '@/common/mixins/base'
import DsMap from '@/components/DsMap/DsMap.vue'
import LOCAL from 'package/17disney-common/const/local'

export default {
  mixins: [base],

  components: { DsMap },

  data() {
    return {
      data: [],
      date: moment().format('YYYY-MM-DD'),
      localInfo: {}
    }
  },

  computed: {},

  mounted() {
    this.localInfo = LOCAL.find(_ => _.value === this.local)
    this.init()
  },

  methods: {
    async init() {
      this.data = await this.$Api.waitTimes.parkDate(this.local, this.date)
    }
  }
}
</script>
