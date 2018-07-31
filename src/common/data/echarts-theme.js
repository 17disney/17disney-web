import Color from 'package/17disney-common/const/color'

const data = {
  color: [
    '#2ec7c9',
    '#b6a2de',
    '#2492d7',
    '#ffb980',
    '#d87a80',
    '#8d98b3',
    '#e5cf0d',
    '#97b552',
    '#95706d',
    '#dc69aa',
    '#07a2a4',
    '#9a7fd1',
    '#588dd5',
    '#f5994e',
    '#c05050',
    '#59678c',
    '#c9ab00',
    '#7eb00a',
    '#6f5553'
  ],
  backgroundColor: 'rgba(0,0,0,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#2492d7'
    },
    subtextStyle: {
      color: '#aaaaaa'
    }
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 1
      }
    },
    lineStyle: {
      normal: {
        width: 2
      }
    },
    symbolSize: 3,
    symbol: 'emptyCircle',
    smooth: true
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: 1
      }
    },
    lineStyle: {
      normal: {
        width: 2
      }
    },
    symbolSize: 3,
    symbol: 'emptyCircle',
    smooth: true
  },
  bar: {
    itemStyle: {
      normal: {
        barBorderWidth: 0,
        barBorderColor: '#ccc'
      },
      emphasis: {
        barBorderWidth: 0,
        barBorderColor: '#ccc'
      }
    }
  },
  pie: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  scatter: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  boxplot: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  parallel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  sankey: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  funnel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#d87a80',
        color0: '#2ec7c9',
        borderColor: '#d87a80',
        borderColor0: '#2ec7c9',
        borderWidth: 1
      }
    }
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    },
    lineStyle: {
      normal: {
        width: 1,
        color: '#aaaaaa'
      }
    },
    symbolSize: 3,
    symbol: 'emptyCircle',
    smooth: true,
    color: [
      '#2ec7c9',
      '#b6a2de',
      '#2492d7',
      '#ffb980',
      '#d87a80',
      '#8d98b3',
      '#e5cf0d',
      '#97b552',
      '#95706d',
      '#dc69aa',
      '#07a2a4',
      '#9a7fd1',
      '#588dd5',
      '#f5994e',
      '#c05050',
      '#59678c',
      '#c9ab00',
      '#7eb00a',
      '#6f5553'
    ],
    label: {
      normal: {
        textStyle: {
          color: '#eeeeee'
        }
      }
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#dddddd',
        borderColor: '#eeeeee',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(254,153,78,1)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#d87a80'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#dddddd',
        borderColor: '#eeeeee',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(254,153,78,1)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#d87a80'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    }
  },
  categoryAxis: {
    axisTick: {
      show: false,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: Color.colorLightGrey
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#edf1f4']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: Color.colorLightGrey
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf1f4']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: Color.colorLightGrey
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf1f4']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: Color.colorLightGrey
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#edf1f4']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#2ec7c9'
      },
      emphasis: {
        borderColor: '#18a4a6'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#333333'
    }
  },
  tooltip: {
    padding: 12,
    trigger: 'axis',
    backgroundColor: '#FFF',
    borderColor: Color.colorDarkGrey,
    borderWidth: 1,
    textStyle: {
      color: Color.colorDarkGrey
    },
    axisPointer: {
      lineStyle: {
        color: '#008acd',
        width: '1'
      },
      crossStyle: {
        color: '#008acd',
        width: '1'
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#008acd',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#008acd',
        borderWidth: 1
      },
      emphasis: {
        color: '#a9334c'
      }
    },
    controlStyle: {
      normal: {
        color: '#008acd',
        borderColor: '#008acd',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#008acd',
        borderColor: '#008acd',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#2ec7c9',
      borderColor: 'rgba(46,199,201,0.4)'
    },
    label: {
      normal: {
        textStyle: {
          color: '#008acd'
        }
      },
      emphasis: {
        textStyle: {
          color: '#008acd'
        }
      }
    }
  },
  dataZoom: {
    backgroundColor: 'rgba(47,69,84,0)',
    dataBackgroundColor: 'rgba(239,239,255,1)',
    fillerColor: 'rgba(182,162,222,0.2)',
    handleColor: '#008acd',
    handleSize: '100%',
    textStyle: {
      color: '#333333'
    }
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: '#eeeeee'
        }
      },
      emphasis: {
        textStyle: {
          color: '#eeeeee'
        }
      }
    }
  }
}

export default data
