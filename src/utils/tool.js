import moment from 'moment'

// 去除空值
export function removeProperty (object) {
  for (let key in object) {
    let value = object[key]
    if (value === '' || value === undefined) {
      delete object[key]
    }
  }
}

export function handleId (id) {
  let { __id__, entityType, destination } = lineToObject(id)
  return [__id__, entityType, destination]
}

export function objectToLine (arg) {
  let line = []

  for (let k in arg) {
    let item = arg[k]
    if (k === '__id__') {
      line.push(item)
    } else {
      line.push(`${k}=${item}`)
    }
  }

  line = line.join(';')
  return line
}

export function lineToObject (arg) {
  let obj = {}
  let arr = arg.split(';')

  for (let item of arr) {
    item = item.split('=')
    if (item.length === 1) {
      obj['__id__'] = item[0]
    } else {
      obj[item[0]] = item[1]
    }
  }
  return obj
}

export function createUrl (data) {
  let url = data.host + data.path + '/'
  if (data.arg) {
    url += objectToLine(data.arg)
  }
  return url
}

export function utcDate (utc) {
  let date = moment()
    .utcOffset(utc)
    .format('YYYY-MM-DD')
  return date
}

// 时间去0
export function simTime (time) {
  console.log(time)
  let data = moment(time, 'HH:mm:ss').format('H:mm')
  return data
}
