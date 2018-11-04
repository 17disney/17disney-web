<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
}

.ds-card--report-top {
  text-align: center;
  border: none;
  background: linear-gradient(to bottom, $color-pick-d2, $color-primary-dark);
  border-radius: 5px;
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
    <div>
      <el-date-picker v-model="date" @change="handleDateChange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期">
      </el-date-picker>
    </div>

    <div class="container">
      <dm-main>
        <el-row :gutter="50">
          <el-col :span="12">
            <dm-card type="report">
              <div slot="header" class="ds-card-header--icon">
                <div class="ds-card-header__icon icon--pep icon__business-excellence"></div>
                <div class="ds-card-header__text">
                  <div class="title">乐园综合指数</div>
                  <div class="title--desc">超过 {{dataCount.flowRank}}% 运营日</div>
                </div>
              </div>
              <day-park-num-charts height="400" :data="dataParkNum"></day-park-num-charts>
            </dm-card>
          </el-col>

          <el-col :span="12">
            <dm-card type="report">
              <div slot="header" class="ds-card-header--icon">
                <div class="ds-card-header__icon icon--pep icon__personal-magic"></div>
                <div class="ds-card-header__text">
                  <div class="title">乐园热门时刻</div>
                  <div class="title--desc">最多有 {{dataPark.flowMax | formatNumber}} 位游客在乐园</div>
                </div>
              </div>
              <day-park-mark-charts :data="dataParkFlow"></day-park-mark-charts>
            </dm-card>
          </el-col>

          <el-col :span="12">
            <dm-card type="report">
              <div slot="header" class="ds-card-header--icon">
                <div class="ds-card-header__icon icon--pep icon__shdr-fastpass"></div>
                <div class="ds-card-header__text">
                  <div class="title">快速通行证领取速度</div>
                  <div class="title--desc" v-if="dataAttFp && dataAttFp.length > 0">最后张快速通行证在 {{dataAttFp[0]['fpFinish'] | timeFormat('H:mm', 'x')}} 被领取</div>
                </div>
              </div>
              <day-att-fp-charts :data="dataAttFp"></day-att-fp-charts>
            </dm-card>
          </el-col>

          <el-col :span="12">
            <dm-card type="report">
              <div slot="header" class="ds-card-header--icon">
                <div class="ds-card-header__icon icon--pep icon__magic-morning"></div>
                <div class="ds-card-header__text">
                  <div class="title">热门项目等候时间</div>
                  <div class="title--desc">超过 {{dataCount.markRank}}% 运营日</div>
                </div>
              </div>
              <day-att-rank-charts :data="dataAtt"></day-att-rank-charts>
            </dm-card>
          </el-col>
        </el-row>
        <!-- <dm-card type="report" class="ds-card--report-top">
          <div class="icon icon--pep icon__shanghai-disney-resort"></div>
          <div class="title">上海迪士尼乐园运营日报</div>
          <div class="title--date">{{date | timeFormat('YYYY 年 M 月 D 日')}}</div>
          <div class="panel--index">
            <div class="index-item">
              <p class="index-item__title">开园时间</p>
              <p class="index-item__num">{{dataPark.enterTime | timeFormat('H:mm', 'HH:mm:ss')}}</p>
              <p class="index-item__desc">比计划提前 {{dataPark.enterDiff}} 分钟</p>
            </div>
            <div class="index-item">
              <p class="index-item__title">开放项目</p>
              <p class="index-item__num">{{dataPark.openAtt}}</p>
              <p class="index-item__desc">演出场次 {{dataPark.show }} 场</p>
            </div>
            <div class="index-item">
              <p class="index-item__title">客流量</p>
              <p class="index-item__num">{{dataPark.flowMax}}</p>
              <p class="index-item__desc">超过 {{dataCount.flowRank}}% 运营日</p>
            </div>
          </div>
        </dm-card> -->

        <!-- <dm-card type="report" class="ds-card--report-top">
          <img src="/static/wx_17shenqi.jpg" alt="一起神奇" class="image--qrcode">
          <div class="title--desc">本数据由 17Disney.com 统计发布</div>
        </dm-card> -->
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
import { lineToObject } from '@/utils/tool'
import { arrayToHash, compare } from '@/utils/array'
import AsideDate from '@/components/Aside/AsideDate'

const TODAY = moment().format('YYYY-MM-DD')

export default {
  mixins: [base],

  components: { AsideDate, ChartsDayFlowMark, DayParkMarkCharts, DayAttRankCharts, DayParkNumCharts, DayAttFpCharts },

  props: {
    select: {}
  },

  data() {
    return {
      date: null,
      dataPark: {},
      dataAtt: [],
      dataOperate: {},
      dataParkNum: [],
      dataParkFlow: [],
      dataAttFp: [],
      dataCount: {}
    }
  },

  watch: {
    select(val) {
      this.handleDateChange(val)
    }
  },

  computed: {},

  mounted() {
    const { date = TODAY } = this.$route.query

    this.handleDateChange(TODAY)
  },

  methods: {
    handleDateChange(date) {
      this.date = date
      this.$router.push({
        path: `/report/day?date=${date}`
      })
      this.init()
    },
    async init() {
      let dataPark = await this.$Api.waitTimes.parkDate(this.local, this.date)

      const { flowMax, openAtt, markMax, markHour, flowHour, show, startTime, enterTime } = dataPark
      const { allFlowDay, allMarkDay, rankMarkDay, rankFlowDay } = dataPark

      const _startTime = moment(startTime, 'HH:mm:ss')
      const _enterTime = moment(enterTime, 'HH:mm:ss')

      const diff = _startTime.diff(_enterTime, 'minutes')

      dataPark.enterDiff = diff

      this.dataPark = dataPark || {}
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

      // dataParkFlow[1]['flow'] = 29565

      this.dataParkFlow = dataParkFlow

      this.dataCount.flowRank = 100 - parseInt(rankMarkDay / allMarkDay * 100)
      this.dataCount.markRank = 100 - parseInt(rankFlowDay / allFlowDay * 100)

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
          const { fpFinish, waitAvg, waitMax } = waitsData[item.aid]
          if (fpFinish > 0) {
            if (item.name === '抱抱龙冲天赛车') return
            const _fpFinish = fpFinish - moment(this.date, 'YYYY-MM-DD').format('x') - 60 * 60 * 1000 * 7
            dataAttFp.push({
              name: item.name,
              fpFinish: _fpFinish
            })
          }
          item.waitAvg = waitAvg
          item.waitMax = waitMax
          item.fpFinish = fpFinish
        }
      })

      this.dataAttFp = dataAttFp.sort(compare('fpFinish'))

      dataAtt = dataAtt.sort(compare('waitAvg'))
      dataAtt.length = 10
      this.dataAtt = dataAtt

      // 处理乐园指数
      let dataOperate = await this.$Api.waitTimes.operateCount(this.local)
      const { flowMaxAvg, markMaxAvg, showAvg, openAttAvg } = dataOperate

      const dataParkNum = [
        {
          name: '客流量',
          max: 70000,
          today: flowMax,
          history: flowMaxAvg
        },
        {
          name: '演出场次',
          max: 70,
          today: show,
          history: showAvg
        },
        {
          name: '等候时间',
          max: 2500,
          today: markMax,
          history: markMaxAvg
        },
        {
          name: '开放项目',
          max: 50,
          today: openAtt,
          history: openAttAvg
        }
      ]
      this.dataParkNum = dataParkNum
    }
  }
}
</script>
