const TIMESGUIDE_TYPE = {
  TIMESGUIDE: 1,
  GUIDEMAP: 2,
  TOWNGUIDE: 3,
  OTHERGUIDE: 4,
  TICKET: 5,
  VOUCHER: 6,
  STICKER: 7
}

const TIMESGUIDE_TYPE_LIST = [
  {
    id: TIMESGUIDE_TYPE.TIMESGUIDE,
    name: '乐园时间表',
    icon: 'magic-morning',
    class: 'is-timesguide',
    columns: 4
  },
  {
    id: TIMESGUIDE_TYPE.GUIDEMAP,
    name: '乐园指南',
    icon: 'disney-resort',
    class: 'is-timesguide',
    columns: 4
  },

  {
    id: TIMESGUIDE_TYPE.TOWNGUIDE,
    name: '小镇指南',
    icon: 'shdr-disneytown',
    class: 'is-timesguide',
    columns: 4
  },
  {
    id: TIMESGUIDE_TYPE.OTHERGUIDE,
    name: '其它指南',
    icon: 'catalogs',
    class: 'is-timesguide',
    columns: 4
  },
  {
    id: TIMESGUIDE_TYPE.TICKET,
    name: '乐园门票',
    icon: 'tickets',
    class: 'is-ticket',
    columns: 2
  },
  {
    id: TIMESGUIDE_TYPE.VOUCHER,
    name: '乐园兑换券',
    icon: 'wdw-tickets-and-passes',
    class: 'is-ticket',
    columns: 2
  },
  {
    id: TIMESGUIDE_TYPE.STICKER,
    name: '乐园贴纸',
    icon: 'show-contains-bubble',
    class: 'is-sticker',
    columns: 2
  }
]

module.exports = {
  TIMESGUIDE_TYPE,
  TIMESGUIDE_TYPE_LIST
}
