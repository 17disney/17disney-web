<style lang='stylus' scoped>
@require '~@/styles/disney/var/color.styl';

.container {
  margin-top: 20px;
}

.report-list-wrap {
  .card--report {
  }
}
</style>
<template>
  <div class="container">
    <el-card>
      <year-wait-charts :data="attCount" :date-range="dateRange"></year-wait-charts>
    </el-card>
    <div class="report-list-wrap" style="margin-top:20px">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="12">
            <year-wait-pie-charts :data="pieCount"></year-wait-pie-charts>
          </el-col>
          <el-col :span="12">
            <year-wait-bar-charts :data="dataBar"></year-wait-bar-charts>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import YearWaitCharts from '@/components/Charts/YearWaitCharts'
import YearWaitPieCharts from '@/components/Charts/YearWaitPieCharts'
import YearWaitBarCharts from '@/components/Charts/YearWaitBarCharts'
import { dateRange } from '@/utils/date'
import Color from 'packages/17disney-common/const/color'

const COLOR = '36,146,215'

const FLOW_MAP = [0, 500, 900, 1300]
const FLOW_COLOR = []

function filterMap(data, map, key) {
  const list = new Array(map.length).fill(0)
  map.push(Infinity)

  data.forEach(item => {
    const value = item[key]
    for (let i = 0; i < map.length - 1; i++) {
      if (value > map[i] && value <= map[i + 1]) {
        list[i]++
      }
    }
  })
  return list
}

export default {
  mixins: [base],
  components: { YearWaitCharts, YearWaitPieCharts, YearWaitBarCharts },

  data() {
    return {
      dateRange: dateRange(-365, 0),
      list: [],
      isInit: false,
      attCount: [],
      pieCount: [],
      dataBar: {}
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      const attCount = await this.$Api.waitTimes.park(this.local, { st, et })

      const mapValue = filterMap(attCount, FLOW_MAP, 'markAvg')
      const mapName = ['空闲', '正常', '拥挤', '爆满']

      const list = []

      mapValue.forEach((value, index) => {
        list.push(
          {
            value,
            name: mapName[index]
          }
        )
      })

      const seriesList = list
      const dataBar = {
        seriesList
      }

      this.dataBar = dataBar
      this.pieCount = list


      this.attCount = attCount
    }
  }
}
</script>
