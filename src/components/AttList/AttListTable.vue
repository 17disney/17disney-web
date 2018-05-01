<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-list-table {
  // padding: 15px;
  &__meta {
    display: flex;
    align-items: center;
  }

  .att-media {
    margin-right: 16px;
    border-radius: 100%;
  }

  &__title {
    color: $color-grey;
    font-size: 17px;
    font-weight: 500;
    width: 200px;
  }
}
</style>
<template>
  <el-table class="att-list-table" :data="data">
    <el-table-column label="游乐项目">
      <template slot-scope="scope">
        <div class="att-list-table__meta">
          <att-media :medias="scope.row.medias" type="finderListMobileSquare"></att-media>
          <div class="att-list-table__title">
            {{scope.row.name}}
          </div>
        </div>
      </template>
    </el-table-column>

    <!-- <el-table-column label="状态">
      <template slot-scope="scope">
      </template>
    </el-table-column> -->

    <el-table-column label="预计等候">
      <template slot-scope="scope">
        <!-- <att-schedules :schedule="forecast[scope.row.aid]" :date="date"></att-schedules> -->
        <att-forecast :forecast="forecast[scope.row.aid]"></att-forecast>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import base from '@/common/mixins/base'
import AttListItem from '@/components/AttList/AttListItem'
import AttMedia from '@/components/Att/AttMedia'
import AttStatus from '@/components/Att/AttStatus'
import AttSchedules from '@/components/Att/AttSchedules'
import AttForecast from '@/components/Att/AttForecast'
import { mapState } from 'vuex'
export default {
  components: { AttListItem, AttMedia, AttSchedules, AttForecast },
  mixins: [base],
  props: {
    date: String,
    data: Array,
    forecast: Object
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      attsWait: state => state.wait.attsWait,
      schedules: state => state.explorer.schedules
    })
  },

  mounted() {
  },

  methods: {
    clickAttItem(row) {
      // console.log(row)
      this.$emit('click-att-item', row.id)
      // row.active = !row.active
    }
  }
}
</script>
