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
          <div slot="header">
            <!-- <div class="icon--pep icon__shanghai-disney-resort"></div> -->
            <div class="icon--pep icon__business-excellence"></div>
            <span>乐园指数</span>
            <span>超过了 70% 的运营日</span>
          </div>
          <day-park-num-charts :data="dataParkNum"></day-park-num-charts>
        </dm-card>
        <dm-card type="report">
          <div slot="header">
            <div class="icon--pep icon__personal-magic"></div>
            <span>热门时刻</span>
            <span>在 10：00 和 10：00人数最多</span>
          </div>
          <day-park-mark-charts :data="dataParkFlow"></day-park-mark-charts>
        </dm-card>
        <dm-card type="report">
          <div slot="header">
            <div class="icon--pep icon__shdr-fastpass"></div>
            <span>快速通行证</span>
          </div>
          <day-att-fp-charts :data="dataAttFp"></day-att-fp-charts>
          <p>开园仅 38 分钟，翱翔·飞跃地平线的快速通行证就被领完</p>
          <p>最后一张快速通行证在 12:16 领完</p>
        </dm-card>
        <dm-card type="report">
          <div slot="header">
            <div class="icon--pep icon__magic-morning"></div>
            <span>热门项目等候时间</span>
            <span>超过了 80% 运营日</span>
          </div>
          <day-att-rank-charts :data="dataAtt"></day-att-rank-charts>
        </dm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import ChartsDayFlowMark from '@/components/Charts/ChartsDayFlowMark'
import DayParkMarkCharts from '@/components/Charts/DayParkMarkCharts'
import DayParkNumCharts from '@/components/Charts/DayParkNumCharts'
import DayAttRankCharts from '@/components/Charts/DayAttRankCharts'
import DayAttFpCharts from '@/components/Charts/DayAttFpCharts'
import { lineToObject } from '@/utils/tool'
import { arrayToHash, compare } from '@/utils/array'

export default {
  mixins: [base],

  components: { ChartsDayFlowMark, DayParkMarkCharts, DayAttRankCharts, DayParkNumCharts, DayAttFpCharts },

  props: {
  },

  data() {
    return {
      date: '2018-07-14',
      dataPark: {},
      dataAtt: [],
      dataOperate: {},
      dataParkNum: [],
      dataParkFlow: [],
      dataAttFp: []
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

      const dataAttFp = []
      dataAtt.forEach(item => {
        item.aid = lineToObject(item.id)['__id__']

        item.waitAvg = 0
        if (waitsData[item.aid]) {
          const { fpFinish, waitAvg } = waitsData[item.aid]
          if (fpFinish > 0) {
            if (item.name === '抱抱龙冲天赛车') return

            const _fpFinish = fpFinish - moment(this.date, 'YYYY-MM-DD').format('x') - 60 * 60 * 1000 * 7
            dataAttFp.push({
              name: item.name,
              fpFinish: _fpFinish
            })
            console.log(_fpFinish)
          }
          item.waitAvg = waitAvg
          item.fpFinish = fpFinish
        }
      })

      this.dataAttFp = dataAttFp.sort(compare('fpFinish'))

      console.log(dataAttFp)

      dataAtt = dataAtt.sort(compare('waitAvg'))
      dataAtt.length = 10

      this.dataAtt = dataAtt

      // 处理乐园指数
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

      // 快速通行证


    }
  }
}
</script>
