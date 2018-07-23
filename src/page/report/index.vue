<style lang='stylus'>
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
    <div class="report-list-wrap">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card>
            32
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
export default {
  mixins: [base],
  components: {},

  data() {
    return {
      dateRange: [],
      list: []
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      // const [st, et] =
      // const data = this.$Api.waitTimes.park(this.local, )
    }
  }
}
</script>
