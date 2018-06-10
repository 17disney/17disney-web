<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.calendar {
  position: relative;
  background: #FFF;
  border-radius: 10px;
  overflow: hidden;
  min-height: 300px;
  background: $color-primary-ss;

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
          font-weight: 500;
        }
      }
    }

    tbody {
      tr {
        td {
          position: relative;
          padding: 1px;
          border: 1px solid #FFF;
          background: $color-primary-ss;
        }
      }
    }
  }
}
</style>

<template>
  <div class="calendar">
    <table class="calendar__table" cellpadding="5">
      <thead>
        <tr>
          <th :width="100/7 + '%'" v-for="week in WEEKS" class="week">{{$t('el.datepicker.weeks.' + [week])}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in calendar" :key="index">
          <td v-for="(day, index) in item" :key="index">
            <calendar-item v-if="day.day" :day="day.day" :data="data[day.index]"></calendar-item>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import AttWaitTime from '@/components/Att/AttWaitTime'
import CalendarItem from './CalendarItem'
import { ATT_WAIT_CLASS } from '@/common/data/const'
const WEEKS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export default {
  components: {
    AttWaitTime, CalendarItem
  },
  props: {
    data: Array,
    ym: String
  },
  data() {
    return {
      day: 0,
      calendar: [],
      WEEKS
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    ym() {
      this.init()
    }
  },
  methods: {
    isLeap(year) {
      let res
      return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0))
    },
    init() {
      const year = moment(this.ym, 'YYYY-MM').format('YYYY')
      const month = moment(this.ym, 'YYYY-MM').format('MM')
      const MONTH_DAYS = [31, 28 + this.isLeap(year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31]

      const m = month - 1
      const firstDay = new Date(year, m, 1)

      let dayOfWeek = firstDay.getDay() - 1
      if (dayOfWeek === -1) dayOfWeek = 6
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

          if (day < 10) day = '0' + day
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


