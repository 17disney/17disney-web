import moment from 'moment'

export function timeFormat(value, format, src = 'YYYY-MM-DD') {
  let val = moment(value, src).format(format)
  if (format === 'd') {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    val = week[val]
  }
  return val
}
