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
          <att-marker v-for="(item, index) in attractionList" :icon="item.icon" :key="index" :coordinates="item.coordinates" :data="item"></att-marker>
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
import AttMarker from '@/components/DsMap/AttMarker'

export default {
  mixins: [base],

  components: { DsMap, AttMarker },

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
    this.getWaits()
  },

  methods: {
    async init() {
      this.data = await this.$Api.waitTimes.parkDate(this.local, this.date)
    },

    async getWaits() {
      const data = await this.$Api.waitTimes.waitsHome(this.local, this.date)
      console.log(data)

    }
  }
}
</script>
