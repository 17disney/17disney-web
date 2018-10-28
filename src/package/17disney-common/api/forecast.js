import request from '@/utils/request'

const base = 'forecast-service'

export default {
  tickets: function tickets(local, params) {
    return request({
      url: `${base}/tickets/${local}`,
      method: 'get',
      params
    })
  },
  weatherHistory: function weatherHistory(st, et) {
    return request({
      url: `${base}/weather/history`,
      method: 'get',
      params: { st, et }
    })
  },
  weatherForecast: function weatherForecast(st, et) {
    return request({
      url: `${base}/weather/forecast`,
      method: 'get',
      params: { st, et }
    })
  },
  dayRank: function dayRank(st, et) {
    return request({
      url: `${base}/day/rank`,
      method: 'get',
      params: { st, et }
    })
  },
  forecastPark: function forecastgPark(local, st, et) {
    return request({
      url: `${base}/forecast/park/${local}`,
      method: 'get',
      params: { st, et }
    })
  },
  forecastTicket: function forecastTicket(local, st, et) {
    return request({
      url: `${base}/forecast/tickets/${local}`,
      method: 'get',
      params: { st, et }
    })
  },
  forecastReport: function forecastReport(local) {
    return request({
      url: `${base}/forecast/report/${local}`,
      method: 'get'
    })
  }
}
