<style lang='stylus'>
.att-mark-num {
  font-size: 14px;
}
</style>
<template>
  <div class="att-mark-num">
    {{label}}
    <strong>
      <slot>
      </slot>
    </strong>
    {{tail}}
  </div>
</template>

<script>
const NAME = 'att-mark-num'
export default {
  name: NAME,

  components: {},

  props: {
    label: String,
    tail: String
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
