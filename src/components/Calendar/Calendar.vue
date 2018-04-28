<template>
  <div class="calendar">
    <div class="calendar-tools">

    </div>
    <table class="calendar__table" cellpadding="5">
      <thead>
        <tr>
          <th v-for="week in weeks" class="week">{{week}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in calendar" :key="index">
          <td v-for="(day, index) in item" :key="index">
            <div class="calendar-item" v-if="day.day">
              <p class="calendar-item__day">{{day.day}}</p>
              <att-wait-time :wait="data[day.index]"></att-wait-time>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import AttWaitTime from '@/components/Att/AttWaitTime'
export default {
  components: {
    AttWaitTime
  },
  props: {
    year: Number,
    month: Number,
    data: Array,
    weeks: {
      type: Array,
      default: () => {
        return ['一', '二', '三', '四', '五', '六', '日']
      }
    }
  },
  data() {
    return {
      day: 0,
      calendar: [],
      today: [],
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    // parkHistory(curVal, oldVal) {
    //   this.init()
    // }
  },
  methods: {
    is_leap(year) {
      let res
      return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    },

    init() {
      const { year, month } = this
      const MONTH_DAYS = [31, 28 + this.is_leap(year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31]

      const today = new Date()
      const m = month - 1
      let day = today.getDate()

      const firstDay = new Date(year, m, 1)
      let dayOfWeek = firstDay.getDay() - 1

      if (dayOfWeek === -1) { dayOfWeek = 6 }
      const calendarCol = Math.ceil((dayOfWeek + MONTH_DAYS[m]) / 7)

      const calendar = []
      let index = -dayOfWeek
      for (let i = 0; i < calendarCol; i++) {
        calendar[i] = []
        for (let k = 0; k < 7; k++) {
          let idx = 7 * i + k
          let date = idx - dayOfWeek + 1
          let day

          if (date <= 0) {

          } else if (date > MONTH_DAYS[m]) {

          } else {
            day = idx - dayOfWeek + 1
          }

          if (day < 10) {
            day = '0' + day
          }
          calendar[i].push({
            day,
            index
          })
          index++
        }
      }
      this.calendar = calendar
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.calendar-tool {
  border-radius: 10px;
  background: $color-primary;
  padding: 15px;
  overflow: hidden;

  .s_title {
    line-height: 36px !important;
    float: left;
    margin-bottom: 0px !important;
  }
}

.panel-history {
  overflow: hidden;
  padding-bottom: 30px;

  .panel-heading {
    border-bottom: 1px solid #EEE;
  }

  // margin-top 30px
  .btn-box {
    float: right;
  }

  // .calendar
  // // max-width 600px
  // margin 0 auto
  .month {
    font-size: 30px;
  }

  .chart-box {
    // margin-top: 30px
    background: $color-primary;
    border-radius: 10px;
    padding: 4px;
    border-radius: 10px;

    .title {
      line-height: 2;
      text-align: center;
      padding: 10px 0;
      margin: 0px;
      font-size: 22px;
      line-height: 22px;
      // padding-left: 15px
    }

    .history-chart {
      border-radius: 5px;
      background: #FFF;
      overflow: hidden;

      .box {
        height: 300px;
      }
    }
  }
}

.calendar {
  background: #FFF;
  margin-top: 30px;
  border-radius: 10px;
  overflow: hidden;

  &__table {
    width: 100%;
    text-align: center;
    margin: 0px;
    border-collapse: collapse;
    border-spacing: 0;

    >thead {
      >tr {
        >th {
          color: #FFF;
          text-align: center;
          background: $color-primary;
          border-bottom: none;
          line-height: 40px;
          // border: 2px solid color_main_fade;
        }
      }
    }

    tbody {
      tr {
        td {
          position: relative;
          height: 40px;
          padding: 1px;
          border: 1px solid rgb(250, 250, 250);
          border-color: $color-primary-s;
          background: $color-primary-ss;
        }
      }
    }
  }

  &-&-itemtem {
  }
}
</style>
