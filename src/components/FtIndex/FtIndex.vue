<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.ft-index {
  display: flex;

  &-item {
    flex: 1;
    text-align: center;

    &__label {
      color: $color-light-grey;
      margin-bottom: 5px;
      font-size: 14px;
    }

    &__value {
      color: $color-grey;
      font-size: 20px;
    }
  }
}
</style>

<template>
  <div class="ft-index">
    <div class="ft-index-item" v-for="item in data" :key="item.label">
      <div class="ft-index-item__label">{{item.label}}</div>
      <div class="ft-index-item__value">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    data: Array
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
