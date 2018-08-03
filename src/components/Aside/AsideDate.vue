<style lang='stylus'>
.aside-date {
}
</style>
<template>
  <div class="aside-date">
    <ul class="aside-date-list">
      <li class="aside-date-item">
        <router-link></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateRange } from '@/utils/date'
export default {
  components: {},

  props: {
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const [startDate, endDate] = dateRange(-30, 0)

      console.log(startDate)
    }
  }
}
</script>
