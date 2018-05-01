<style lang='stylus'>
.att-sechedules {
  display: flex;

  &__time {
    text-align: center;
    width: 200px;
  }
}
</style>
<template>
  <div class="att-sechedules">
    <div class="att-sechedules__time">
      {{schedule.startTime | timeFormat('H:mm', 'H:mm:ss')}} - {{schedule.endTime | timeFormat('H:mm', 'H:mm:ss')}}
    </div>
    <att-status :status="schedule.type"></att-status>
  </div>
</template>

<script>
import AttStatus from './AttStatus'

export default {
  components: { AttStatus },

  props: {
    schedule: Object
  },

  data() {
    return {
    }
  },

  computed: {
  },

  mounted() { },

  methods: {}
}
</script>
