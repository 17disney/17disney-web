<template>
  <div class="calendar">
    <div class="calendar-tools">
      <div class="text center">
      </div>
    </div>
    <table cellpadding="5" class="table">
      <thead>
        <tr>
          <th width="14.2857%" v-for="week in weeks" class="week">{{week}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in days">
          <td v-for="day in item">
            <div class="box-day" :class="{now: day.type == 1, next: day.type == 2,'green': day.wait < 30, 'orange': day.wait >= 30 && day.wait < 60, 'red': day.wait >= 60}">
              <i class="wea_icon" :class="'d' + day.wea_i"></i>
              <p class="day">{{day.day}}</p>
              <span class="zhishu" v-if="day.wait">
                <p class="max" v-if="day.wait" :class="{now: day.type == 1, next: day.type == 2,'green': day.wait < 20, 'orange': day.wait >= 20 && day.wait < 30, 'red': day.wait >= 30}">
                  {{day.wait}}
                </p>
              </span>
              <span v-if="day.max" class="wait" :class="{'blue': day.max < 20, 'green': day.max >= 20 && day.max < 28, 'orange': day.max >= 28}">{{day.max}}
                <em v-if="day.min">/</em>{{day.min}}℃</span>
              <p class="type" v-if="day.type == 1">实时</p>
              <p class="type" v-if="day.type == 2">预测</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    year: {},
    month: {},
    parkHistory: {},
    weeks: {
      type: Array,
      default: function () {
        return ['一', '二', '三', '四', '五', '六', '日']
      }
    },
    months: {
      type: Array,
      default: function () {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      }
    }
  },
  data() {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      days: [],
      today: [],
      currentMonth: Number,
      monthString: "",
    }
  },
  created() {
    this.init()
  },
  watch: {
    parkHistory(curVal, oldVal) {
      this.init()
    }
  },
  methods: {
    init() {
      let year = this.year
      let month = this.month
      this.render(year, month)
    },
    is_leap(year) {
      let res
      return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    },

    render(y, m) {
      let today = new Date()
      let year = y //today.getFullYear()
      m = m - 1//today.getMonth()
      let day = today.getDate()

      let days_per_month = [31, 28 + this.is_leap(year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31]


      let firstday = new Date(year, m, 1)
      let dayOfWeek = firstday.getDay() - 1
      if (dayOfWeek == -1) { dayOfWeek = 6 }


      let str_nums = Math.ceil((dayOfWeek + days_per_month[m]) / 7)

      let temp = []

      for (let i = 0; i < str_nums; i++) {
        temp[i] = []

        for (let k = 0; k < 7; k++) {
          let idx = 7 * i + k
          let date = idx - dayOfWeek + 1
          let json = []
          let day = ''

          if (date <= 0) {

          } else if (date > days_per_month[m]) {

          } else {
            day = idx - dayOfWeek + 1
          }

          if (day) {
            let month = m + 1
            if (month < 10) {
              month = '0' + month
            }
            if (day < 10) {
              day = '0' + day
            }

            var day_x = moment(y + '-' + month + '-' + day).format('x') / 1000

            if (this.parkHistory[day_x]) {
              json = this.parkHistory[day_x]
            }
          }

          json['day'] = day

          temp[i].push(json)
        }
      }
      this.days = temp
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
</style>
