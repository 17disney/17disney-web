import moment from 'moment'

export function today(utc = 8) {
  const ret = moment().utcOffset(utc).format('YYYY-MM-DD')
  return ret
}

export function utcDate (utc) {
  let date = moment()
    .utcOffset(utc)
    .format('YYYY-MM-DD')
  return date
}
