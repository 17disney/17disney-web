<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.ds-map-float {
  display: flex;
  position: fixed;
  right: 16px;
  bottom: 8px;
  z-index: 100;
  background-color: rgba($color-grey, 0.9);
  border-radius: 24px;
  z-index: 1000;

  .btn {
    width: 48px;
    height: 48px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    transition: 0.5s;

    &:active {
      color: rgba(255, 255, 255, 0.7);
    }

    .att-icon {
      line-height: 48px;
    }
  }
}
</style>
<template>
  <div class="ds-map-float">
    <a @click="handleClick('refresh')" class="btn">
      <att-icon name="refresh"></att-icon>
    </a>
    <a @click="handleClick('list')" class="btn" v-if="mode=='map'">
      <att-icon name="lists"></att-icon>
    </a>
    <a @click="handleClick('map')" class="btn" v-if="mode=='list'">
      <att-icon name="maps"></att-icon>
    </a>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Ds-Map-Float
| 地图悬浮按钮
*/

const NAME = 'att-map-float'

export default {
  name: NAME,

  components: {},

  props: {
    mode: String
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {

  },

  methods: {
    handleClick(val) {
      this.$emit('click', val)
    }
  }
}
</script>
