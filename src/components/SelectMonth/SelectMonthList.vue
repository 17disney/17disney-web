<template>
  <div class="att-date-select__list">
    <div @click="handleClick(item.value)" class="att-date-select__item" :class="{'is-active': item.value === value}" v-for="item in list" :key="item.value">
      <div class="att-date-select__year">
        {{item.year}}
      </div>
      <div class="att-date-select__month">{{item.view}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    value: String,
    list: Array
  },

  methods: {
    handleClick(value) {
      this.$emit('click', value)
    }
  }
}
</script>
