<style lang='stylus'>
</style>
<template>
  <div class="att-date-select__list">
    <div @click="handleClick(item.value)" class="att-date-select__item" :class="{'is-active': item.value === value}" v-for="item in list" :key="item.value">
      <div class="att-date-select__date">{{item.view}}</div>
      <div class="att-date-select__week">
        {{$t('el.datepicker.weeks.' + [item.week])}}
      </div>
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

  data() {
    return {
    }
  },

  computed: {},

  mounted() {

  },

  methods: {
    handleClick(value) {
      this.$emit('click', value)
    }
  }
}
</script>
