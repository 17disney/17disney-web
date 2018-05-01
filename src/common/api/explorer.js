import request from '@/utils/request'

const base = 'https://api.17disney.com/wait-times-service'
// const cdn = 'https://park-explorer.17disney.com'

export default {
  destinations: function destinations(local) {
    return request({
      url: `${base}/destinations/park/${local}`,
      method: 'get'
    })
  },

  destinationsRaw: function destinationsRaw(local) {
    return request({
      url: `${base}/destinations/raw/${local}`,
      method: 'get'
    })
  },

  updateDestinationsId: function updateDestinationsId(id, data) {
    return request({
      url: `${base}/destinations/park/destinations/${id}`,
      method: 'put',
      data
    })
  },

  schedulesPre: function schedulesPre(local) {
    return request({
      url: `${base}/schedules/pre/${local}`,
      method: 'get'
    })
  }
}
