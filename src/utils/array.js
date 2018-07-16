/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Array
| 数组类操作
*/

// 用于图表数据最大值推荐
export function markMax(arr, size, add = 0) {
  arr = arr.filter(_ => _ > 0)
  let max = Math.max(...arr)
  max = Math.ceil(max / size) * size + size * add

  return max ? max : undefined
}

export function arrayToHash(arr, key) {
  const hash = {}
  arr.forEach(item => {
    hash[item[key]] = item
  })
  return hash
}

export function compare(property) {
  return function(a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value2 - value1
  }
}
