import request from './request'
let version = 'v3'

let base = `https://park-cn.17disney.com/api/${version}`
let cdn = `https://park-explorer.17disney.com`
// let local = 'shanghai'
const explorerCalendar = (local, date) => request(`${base}/explorer-service/calendar/${local}/${date}`)
const explorerSchedules = (local, date) => request(`${base}/explorer-service/schedules/${local}/${date}`)

const explorerDestinations = (local, type) => request(`${cdn}/explorer-service/destinations/${local}/${type}`)
const explorerFacetGroups = (local) => request(`${base}/explorer-service/facet-groups/${local}`)

const waitTimsPark = (local, date) => request(`${base}/wait-times/park/${local}/${date}`)
const waitTimsAttractions = (local, date) => request(`${base}/wait-times/attractions/${local}/${date}`)
const waitTimsAttractionsId = (local, date, id) => request(`${base}/wait-times/attractions/${local}/${date}/${id}`)

const waitCountPark = (local, st, et) => request(`${base}/wait-count/park/${local}`, {st, et})
const waitCountAttractions = (local, id, data) => request(`${base}/wait-count/attractions/${local}/${id}`, data)

const ticketAvailable = (local) => request(`${base}/ticket/available/${local}`)
const ticketAvailableDate = (local, date) => request(`${base}/ticket/available/${local}/${date}`)

export default {
  explorerCalendar,
  explorerSchedules,

  explorerDestinations,
  explorerFacetGroups,

  waitTimsPark,
  waitTimsAttractions,
  waitTimsAttractionsId,

  waitCountPark,
  waitCountAttractions,

  ticketAvailable,
  ticketAvailableDate
}
