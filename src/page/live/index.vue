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
    border: 1px solid $color-light-grey-s;
    overflow: hidden;
    margin-bottom: 20px;
  }
}

.live-time {
  &-wrap {
    overflow: auto;
    margin-bottom: 20px;

    .title {
      color: $color-grey;
      font-size: 17px;
      margin-bottom: 5px;
      line-height: 18px;
    }

    .open-time {
      color: $color-primary;
      font-size: 20px;
    }
  }
}

.live-open-time {
  float: left;
}

.live-clock {
  float: right;
  display: flex;
  border: 1px solid $color-primary;
  color: #FFF;
  width: 200px;
  border-radius: 10px;
  overflow: hidden;
  height: 42px;
  line-height: 40px;
  font-size: 18px;
  margin-top: 5px;

  &__time {
    width: 130px;
    text-align: center;
    color: $color-grey;
  }

  &__btn {
    flex: 1;
    background: $color-primary;
    color: #FFF;
    text-align: center;
    cursor: pointer;
    font-size: 15px;

    &:hover {
      background: lighten($color-primary, 10);
    }
  }
}
</style>
<template>
  <div class="container">
    <dm-main>
      <div class="live-time-wrap">
        <div class="live-time__clock">

          <div class="live-open-time">
            <h3 class="title">{{$t('ds.title.parkOpentime')}}</h3>
            <span class="open-time">
              {{data.startTime | timeFormat('H:mm', 'HH:mm:ss')}} - {{data.endTime | timeFormat('H:mm', 'HH:mm:ss')}}
            </span>
          </div>

          <div class="live-clock">
            <div class="live-clock__time">{{time}}</div>
            <div @click="getWaits" class="live-clock__btn">{{$t('ds.label.refresh')}}</div>
          </div>
        </div>
      </div>
      <div class="ds-map-wrap">
        <att-map v-if="local" :local="local" :center="localInfo.coordinates">
          <att-marker v-for="(item, index) in attractionList" :icon="item.icon" :key="index" :coordinates="item.coordinates" :data="item"></att-marker>
        </att-map>
      </div>
      <el-row :gutter="30">
        <el-col :span="12" v-if="local === 'shanghai'">
          <!-- 乐园客流量 -->
          <dm-card>
            <div slot="header" class="clearfix">
              <span>{{$t('ds.label.parkFlow')}}</span>
            </div>
            <charts-flow-day :height="200" :data="data.flowHour"></charts-flow-day>
          </dm-card>
        </el-col>
        <el-col :span="12">
          <!-- 乐园指数 -->
          <dm-card>
            <div slot="header" class="clearfix">
              <span>{{$t('ds.label.parkIndex')}}</span>
            </div>
            <charts-park-mark :height="200" :data="data.markHour"></charts-park-mark>
          </dm-card>
        </el-col>
      </el-row>
    </dm-main>
  </div>
</template>

<script>
import moment from 'moment'
import base from '@/common/mixins/base'
import DsMap from '@/components/DsMap/DsMap.vue'
import LOCAL from 'package/17disney-common/const/local'
import ChartsFlowDay from '@/components/Charts/ChartsFlowDay'
import ChartsParkMark from '@/components/Charts/ChartsParkMark'

export default {
  mixins: [base],

  components: { DsMap, ChartsFlowDay, ChartsParkMark },

  data() {
    return {
      isInit: false,
      data: {},
      date: moment().format('YYYY-MM-DD'),
      localInfo: {},
      time: '--:--:--'
    }
  },

  computed: {},

  mounted() {
    this.localInfo = LOCAL.find(_ => _.value === this.local)
    this.init()
    this.getWaits()

    setInterval(this.updateTime, 1000)
  },

  methods: {
    async init() {
      const data = await this.$Api.waitTimes.parkDate(this.local, this.date)
      this.data = data || {}
    },

    async getWaits() {
      this.$store.dispatch('getAttractionsWait', this.date)

      if (!this.isInit) {
        this.isInit = true
        return
      }
      this.$message({
        message: '已更新',
        type: 'success'
      })
    },

    updateTime() {
      this.time = moment().format('H:mm:ss')
    }
  }
}



</script>
