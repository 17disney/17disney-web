import request from '@/utils/request'

const base = 'http://api.17disney.com/wait-times-service'

export default {
  attractions: function attractions(local, date, params = {}) {
    return request({
      url: `${base}/wait-times/home/${local}/${date}`,
      method: 'get',
      params
    })
  },

  attractionsId: function attractionsId(local, date, id) {
    return request({
      url: `${base}/wait-times/attractions/${local}/${id}/${date}/`,
      method: 'get'
    })
  },

  attractionsIdCount: function attractionsIdCount(local, id, params) {
    return request({
      url: `${base}/wait-times/attractions/${local}/${id}`,
      method: 'get',
      params
    })
  },

  park: function park(local, date) {
    return request({
      url: `${base}/wait-times/park/${local}/${date}`,
      method: 'get'
    })
  },

  parkCount: function parkCount(local, params) {
    return request({
      url: `${base}/wait-times/park/${local}`,
      method: 'get',
      params
    })
  }
}
