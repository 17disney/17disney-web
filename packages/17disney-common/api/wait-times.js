import request from '@/utils/request'

const BASE = 'wait-times-service'

export default {
  // 实时等候时间
  waitsHome: function waitsHome(local, date) {
    return request({
      url: `${BASE}/wait-times/home/${local}/${date}`,
      method: 'get'
    })
  },
  // 售票量范围查询
  ticket: function ticket(local, params) {
    return request({
      url: `${BASE}/ticket/available/${local}`,
      method: 'get',
      params
    })
  },
  // 售票量按天查询
  ticketDate: function ticketDate(local, date) {
    return request({
      url: `${BASE}/ticket/available/${local}/${date}`,
      method: 'get'
    })
  },
  // 乐园按天查询
  parkDate: function parkDate(local, date) {
    return request({
      url: `${BASE}/wait-times/park/${local}/${date}`,
      method: 'get'
    })
  },
  // 乐园范围查询
  park: function park(local, params) {
    return request({
      url: `${BASE}/wait-times/park/${local}`,
      method: 'get',
      params
    })
  },
  // 单个项目日期查询
  attractionsDate: function attractionsDate(local, id, date) {
    return request({
      url: `${BASE}/wait-times/attractions/${local}/${id}/${date}`,
      method: 'get'
    })
  },
  // 单个项目范围查询
  attractions: function attractions(local, id, params) {
    return request({
      url: `${BASE}/wait-times/attractions/${local}/${id}`,
      method: 'get',
      params
    })
  },
  // 项目信息
  destinations: function destinations(local, params) {
    return request({
      url: `${BASE}/destinations/park/${local}`,
      method: 'get',
      params
    })
  },
  // 项目原始信息
  destinationsRaw: function destinationsRaw(local) {
    return request({
      url: `${BASE}/destinations/raw/${local}`,
      method: 'get'
    })
  },
  // 更新项目信息
  updateDestinationsId: function updateDestinationsId(id, data) {
    return request({
      url: `${BASE}/destinations/park/destinations/${id}`,
      method: 'put',
      data
    })
  },
  // 项目开放时间
  schedules: function schedules(local, date) {
    return request({
      url: `${BASE}/explorer/park/schedules/${local}/${date}`,
      method: 'get'
    })
  },
  // 乐园时间表
  calendars: function calendars(local) {
    return request({
      url: `${BASE}/calendars/${local}`,
      method: 'get'
    })
  },
  // 乐园运营统计
  operateCount: function operateCount(local) {
    return request({
      url: `${BASE}/operate/count/${local}`,
      method: 'get'
    })
  }
}
