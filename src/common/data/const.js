import Color from '17disney-common/const/color'

const ATT_WAIT_CLASS = {
  default: {
    name: '关闭',
    class: 'is-default'
  },
  green: {
    name: '舒适',
    class: 'is-green'
  },
  yellow: {
    name: '适中',
    class: 'is-yellow'
  },
  orange: {
    name: '拥挤',
    class: 'is-orange'
  },
  red: {
    name: '爆满',
    class: 'is-red'
  }
}

const PARK_MARK_CLASS = {
  default: {
    name: '关闭',
    class: 'is-default'
  },
  green: {
    name: '舒适',
    class: 'is-green'
  },
  yellow: {
    name: '适中',
    class: 'is-yellow'
  },
  orange: {
    name: '拥挤',
    class: 'is-orange'
  },
  red: {
    name: '爆满',
    class: 'is-red'
  }
}

const TICKET_INDEX_MAP = [
  {
    gt: 0,
    lte: 4999,
    color: Color.colorGreen,
    className: 'is-green'
  },
  {
    gt: 5000,
    lte: 9999,
    color: Color.colorYellow,
    className: 'is-yellow'
  },
  {
    gt: 10000,
    lte: 14999,
    color: Color.colorOrange,
    className: 'is-orange'
  },
  {
    gt: 15000,
    color: Color.colorRed,
    className: 'is-default'
  }
]

export {
  ATT_WAIT_CLASS,
  PARK_MARK_CLASS,
  TICKET_INDEX_MAP
}
