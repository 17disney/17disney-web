import moment from 'moment'
// import { lineToObject } from './tool'
// import { landArr } from './land-arr'

// export function landName (id) {
//   let aid = lineToObject(id)['__id__']
//   return landArr[aid]
// }

export function timeSim(time) {
  let ret
  if (time) {
    ret = moment(`${time}`, 'HH:mm:ss').format('H:mm')
  }
  return ret
}

export function timeFormat(value, format, src = 'YYYY-MM-DD') {
  let val = moment(value, src).format(format)
  if (format === 'd') {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    val = week[val]
  }
  return val
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
