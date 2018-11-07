import moment from 'moment'
import LOCALE from 'packages/17disney-common/const/locale'

// 时间格式化
export function timeFormat(value, format, src = 'YYYY-MM-DD') {
  return moment(value, src).format(format)
}

// 人性化时间
export function goodTime(time) {
  let dist = Date.now() - time
  let ret
  if (dist < 60000 * 2) {
    ret = '刚刚'
  } else if (dist >= 60000 * 2 && dist < 60000 * 40) {
    ret = Math.round(dist / 60000) + '分钟前'
  } else if (dist >= 60000 * 40 && dist < 60000 * 1200) {
    ret = Math.round(dist / (60000 * 60)) + '小时前'
  } else {
    ret = moment(time, 'x').format('M月D日')
  }
  return ret
}

// 数字格式化
export function formatNumber(n) {
  var b = parseInt(n).toString()
  var len = b.length
  if (len <= 3) {
    return b
  }
  var r = len % 3
  return r > 0
    ? b.slice(0, r) +
        ',' +
        b
          .slice(r, len)
          .match(/\d{3}/g)
          .join(',')
    : b
        .slice(r, len)
        .match(/\d{3}/g)
        .join(',')
}

// 返回位置 Label
export function locale(value) {
  return LOCALE.find(_ => _.value === value)['label']
}
