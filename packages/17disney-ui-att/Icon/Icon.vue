<template>
  <span class="att-icon icon--pep" :class="'icon__' + name"></span>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Att-Icon
|
*/

const NAME = 'att-icon'

export default {
  name: NAME,
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}

</script>

