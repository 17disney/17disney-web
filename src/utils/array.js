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
