<style lang='stylus' scoped>
@require '~@/styles/disney/var/color.styl';

.container {
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
}

.ds-card--report-top {
  text-align: center;
  border: none;
  background: linear-gradient(to bottom, $color-pick-d2, $color-primary-dark);
  border-radius: 10px;
  padding: 40px 0;

  .icon {
    font-size: 70px;
    height: 70px;
    color: rgb(126, 130, 226);
  }

  .title {
    margin-bottom: 20px;
    margin-top: 5px;
    color: $color-primary-ss;
    font-size: 20px;

    &--date {
      font-size: 16px;
      // font-weight: 600;
      color: $color-primary-ss;
    }

    &--desc {
      font-size: 15px;
      margin-bottom: 0px;
      color: $color-primary-ss;
    }
  }

  .image--qrcode {
    width: 100px;
    padding: 4px;
    background: #FFF;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .panel--index {
    display: flex;
    text-align: center;
    margin-top: 40px;

    .index-item {
      color: rgba(255, 255, 255, 0.8);
      flex: 1;

      &:not(:first-child) {
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }

      &__title {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
      }

      &__num {
        color: #FFF;
        font-size: 24px;
      }

      &__desc {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }
    }
  }
}

.ds-card-header--icon {
  display: flex;
  align-items: center;

  .ds-card-header {
    &__icon {
      font-size: 50px;
      color: $color-primary;
      margin-right: 15px;
    }
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    color: $color-grey;

    &--desc {
      margin-top: 5px;
      color: $color-primary;
    }
  }
}
</style>
<template>
  <div>
    <div class="container">
      <dm-main>
        <dm-card type="report" class="ds-card--report-top">
          <div class="icon icon--pep icon__shanghai-disney-resort"></div>
          <div class="title">上海迪士尼乐园运营周报</div>
          <div class="title--date">{{dateRange[0] | timeFormat('YYYY.MM.DD')}} - {{dateRange[1] | timeFormat('MM.DD')}}</div>
        </dm-card>


        <dm-card type="report">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon icon--pep icon__business-excellence"></div>
            <div class="ds-card-header__text">
              <div class="title">乐园综合指数</div>
              <!-- <div class="title--desc">工作日对比双休日</div> -->
            </div>
          </div>
          <week-park-num-charts :data="dataParkNum"></week-park-num-charts>
        </dm-card>

        <dm-card type="report">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon icon--pep icon__business-excellence"></div>
            <div class="ds-card-header__text">
              <div class="title">一周乐园客流</div>
            </div>
          </div>
          <week-flow-charts :data="dataPark"></week-flow-charts>
        </dm-card>

        <dm-card type="report" v-for="item in dataAtt" :key="item.aid">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon">
              <att-media :medias="attFind(item.aid).medias"></att-media>
            </div>
            <div class="ds-card-header__text">
              <div class="title">{{attFind(item.aid).name}}</div>
            </div>
          </div>
          <week-att-charts :id="item.aid" :data="item.data"></week-att-charts>
        </dm-card>
      </dm-main>
    </div>
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
import WeekFlowCharts from '@/components/Charts/WeekFlowCharts'
import WeekAttCharts from '@/components/Charts/WeekAttCharts'
import WeekParkNumCharts from '@/components/Charts/WeekParkNumCharts'

import { lineToObject } from '@/utils/tool'
import { arrayToHash, compare, arrayAvg } from '@/utils/array'

const TODAY = moment().format('YYYY-MM-DD')
const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export default {
  mixins: [base],

  components: { WeekFlowCharts, WeekAttCharts, WeekParkNumCharts, ChartsDayFlowMark, DayParkMarkCharts, DayAttRankCharts, DayParkNumCharts, DayAttFpCharts },

  props: {
    select: {}
  },

  data() {
    return {
      date: null,
      dateRange: ['2018-07-30', '2018-08-05'],
      dataPark: [],
      dataAtt: [],
      dataOperate: {},
      dataParkNum: [],
      dataParkFlow: [],
      dataAttFp: [],
      dataCount: {},
      attList: [
        'attSoaringOverHorizon',
        'attTronLightcyclePowerRun',
        'attRoaringRapids',
        'attSevenDwarfsMineTrain'
      ]
    }
  },

  watch: {
    select(val) {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {

    async init() {
      const [st, et] = this.dateRange
      let dataPark = await this.$Api.waitTimes.park(this.local, { st, et })

      const showWork = []
      const showWeek = []

      const attrList = ['flowMax', 'openAtt', 'show', 'markMax']
      const dataAttr = {}

      dataPark.forEach(item => {
        const { date } = item
        const week = moment(date).format('ddd')
        const weekView = this.$t('el.datepicker.weeks.' + WEEKS[moment(date, 'YYYY-MM-DD').format('e')])
        item.dateView = `${moment(date).format('M月D日')}\n星期${weekView}`

        const { flowMax, openAtt, markMax, markHour, flowHour, show, startTime, enterTime } = item
        const { allFlowDay, allMarkDay, rankMarkDay, rankFlowDay } = item
        item.flowMaxView = (flowMax / 10000).toFixed(1) + ' 万'
      })

      attrList.forEach(key => {
        const arr = dataPark.map(item => item[key])
        // dataAttr[key] = dataPark.map(item => item[key])

        const workDay = arr.slice(0, 5)
        const weekDay = arr.slice(6, 7)

        dataAttr[key] = {
          work: Math.round(arrayAvg(workDay)),
          week: Math.round(arrayAvg(weekDay))
        }
      })

      console.log(dataAttr)

      const dataParkNum = [
        {
          name: '客流量',
          max: 70000,
          today: dataAttr['flowMax']['week'],
          history: dataAttr['flowMax']['work'],
        },
        {
          name: '演出场次',
          max: 70,
          today: dataAttr['show']['week'],
          history: dataAttr['show']['work'],
        },
        {
          name: '等候时间',
          max: 2500,
          today: dataAttr['markMax']['week'],
          history: dataAttr['markMax']['work'],
        },
        {
          name: '开放项目',
          max: 50,
          today: dataAttr['openAtt']['week'],
          history: dataAttr['openAtt']['work'],
        }
      ]

      console.log(dataParkNum)

      this.dataParkNum = dataParkNum

      console.log(dataAttr)

      const { attList } = this
      this.dataPark = dataPark

      const dataAtt = []

      for (let i = 0; i < attList.length; i++) {
        const aid = attList[i]
        const data = await this.$Api.waitTimes.attractions(this.local, aid, { st, et })

        data.forEach(item => {
          const { waitAvg, waitMax, flowMax, date } = item
          const week = moment(date).format('ddd')
          const weekView = this.$t('el.datepicker.weeks.' + WEEKS[moment(date, 'YYYY-MM-DD').format('e')])
          item.dateView = `${moment(date).format('M月D日')}\n星期${weekView}`
          item.waitView = `${waitAvg} - ${waitMax}''`
        })
        dataAtt.push({ aid, data })
      }

      this.dataAtt = dataAtt
    }
  }
}
</script>
