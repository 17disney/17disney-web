<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 30px;
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
    <div class="report-list-wrap">

      <el-row :gutter="20" style="margin-top:12px">
        <el-col :span="12">
          <el-card>
            <year-wait-pie-charts :data="pieCount"></year-wait-pie-charts>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import YearWaitCharts from '@/components/Charts/YearWaitCharts'
import YearWaitPieCharts from '@/components/Charts/YearWaitPieCharts'
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
  components: { YearWaitCharts, YearWaitPieCharts },

  data() {
    return {
      dateRange: dateRange(-365, 0),
      list: [],
      isInit: false,
      attCount: [],
      pieCount: []
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

      this.pieCount = list


      this.attCount = attCount
    }
  }
}
</script>
