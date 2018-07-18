<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 32px;
}
</style>
<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <dm-card type="report">
          <div slot="header" class="clearfix">
            <span>乐园指数</span>
          </div>
          <day-park-num-charts :data="dataParkNum"></day-park-num-charts>
        </dm-card>
        <dm-card type="report">
          <div slot="header" class="clearfix">
            <span>热门时刻</span>
          </div>
          <day-park-mark-charts :height="200" :data="dataParkFlow"></day-park-mark-charts>
        </dm-card>
        <dm-card type="report">
          <div slot="header" class="clearfix">
            <span>热门项目等候时间</span>
          </div>
          <day-att-rank-charts :data="dataAtt"></day-att-rank-charts>
        </dm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import ChartsDayFlowMark from '@/components/Charts/ChartsDayFlowMark'
import DayParkMarkCharts from '@/components/Charts/DayParkMarkCharts'
import DayParkNumCharts from '@/components/Charts/DayParkNumCharts'
import DayAttRankCharts from '@/components/Charts/DayAttRankCharts'
import { lineToObject } from '@/utils/tool'
import { arrayToHash, compare } from '@/utils/array'

export default {
  mixins: [base],

  components: { ChartsDayFlowMark, DayParkMarkCharts, DayAttRankCharts, DayParkNumCharts },

  props: {
  },

  data() {
    return {
      date: '2018-07-14',
      dataPark: {},
      dataAtt: [],
      dataOperate: {},
      dataParkNum: [],
      dataParkFlow: []
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      let dataPark = await this.$Api.waitTimes.parkDate(this.local, this.date)
      this.dataPark = dataPark || {}

      const { flowMax, openAtt, markMax, markHour, flowHour } = dataPark

      // 热门时刻表单
      const dataParkFlow = []
      markHour.forEach((item, index) => {
        const [hour, mark] = item
        dataParkFlow.push({
          hour,
          mark,
          flow: flowHour[index][1]
        })
      })
      this.dataParkFlow = dataParkFlow



      // 读取项目等候时间
      let waitsData = await this.$Api.waitTimes.waitsHome(this.local, this.date)
      waitsData = arrayToHash(waitsData, 'id')

      // 合并等候时间
      let dataAtt = await this.$Api.waitTimes.destinations(this.local)
      dataAtt = dataAtt.filter(item => item.type === 'attraction')
      dataAtt.forEach(item => {
        item.aid = lineToObject(item.id)['__id__']

        item.waitAvg = 0
        if (waitsData[item.aid]) {
          item.waitAvg = waitsData[item.aid]['waitAvg']
        }
      })

      dataAtt = dataAtt.sort(compare('waitAvg'))
      dataAtt.length = 10

      this.dataAtt = dataAtt

      let dataOperate = await this.$Api.waitTimes.operateCount(this.local)

      const { flowMaxAvg, markMaxAvg } = dataOperate

      const dataParkNum = [
        {
          name: '客流量',
          max: 80000,
          today: flowMax,
          history: flowMaxAvg
        },
        {
          name: '演出场次',
          max: 50,
          today: 40,
          history: 45
        },
        {
          name: '等候时间',
          max: 2000,
          today: markMax,
          history: markMaxAvg
        },
        {
          name: '开放项目',
          max: 40,
          today: openAtt,
          history: 30
        }
      ]
      this.dataParkNum = dataParkNum
      console.log(dataOperate)
      this.dataOperate = dataOperate
      //
    }
  }
}
</script>
