import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

const CNAME = {
  'year': 365,
  'week': 7,
  'month': 30
}
export function today(format = DATE_FORMAT) {
  return moment().format(format)
}

export function dateRange(start, end, format = DATE_FORMAT) {
  let startDate, endDate
  if (typeof start === 'number') {
    if (CNAME[start]) start = CNAME[start]
    if (CNAME[end]) end = CNAME[end]

    startDate = moment().add(start, 'days').format(format)
    endDate = moment().add(end, 'days').format(format)
  } else {
    if (start.length === 4) {
      const year = start

      startDate = moment(year, 'YYYY').startOf('year').format(format)
      endDate = moment(year, 'YYYY').endOf('year').format(format)
    } else if (start.length === 6) {
      const momth = start

      startDate = moment(momth, 'YYYY-MM').startOf('month').format(format)
      endDate = moment(momth, 'YYYY-MM').endOf('month').format(format)
    } else {
      throw new Error('start error')
    }
  }

  return [startDate, endDate]
}
