import moment from 'moment'
import { lineToObject } from './tool'
import { landArr } from './land-arr'

export function landName (id) {
  let aid = lineToObject(id)['__id__']
  return landArr[aid]
}

// 时间去0
export function timeSim (time) {
  let ret
  if (time) {
    ret = moment(`${time}`, 'HH:mm:ss').format('H:mm')
  }
  return ret
}

// 人性化时间
export function goodTime (time) {
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
