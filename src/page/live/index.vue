<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 32px;
}
</style>
<template>
  <div class="container">
    <el-row :gutter="50">
      <el-col :span="10">
        <dm-card>
          <div slot="header" class="clearfix">
            <span>{{this.$t('ds.label.forecastflow')}}</span>
          </div>
          <charts-flow v-loading="loading" :data="forecast"></charts-flow>
        </dm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import base from '@/common/mixins/base'

export default {
  mixins: [base],

  components: {},

  props: {
  },

  data() {
    return {
      data: [],
      date: moment().format('YYYY-MM-DD')
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.data = await this.$Api.waitTimes.parkDate(this.local, this.date)
    }
  }
}
</script>
