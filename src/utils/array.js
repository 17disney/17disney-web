/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
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

// 数组转 HASH
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

export function sum(arr) {
  return arr.reduce(function(prev, curr, idx, arr) {
    return prev + curr
  })
}

export function arrayAvg(arr) {

  return sum(arr) / arr.length
}
