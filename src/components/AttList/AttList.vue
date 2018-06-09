<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-list {
  &-item {
    display: flex;
    align-items: center;
    padding: 14px 14px;
    border-bottom: 1px solid $color-light-grey-sss;

    .att-sechedules {
      width: 400px;
    }

    .att-forecast {
      width: 120px;
    }

    .att-media {
      margin-right: 16px;
      border-radius: 100%;
    }

    &.is-active {
      // border: 1px solide @color-primary;
    }

    &__title {
      flex: 1;
      color: $color-grey;
      font-size: 17px;
      font-weight: 500;
    }
  }
}
</style>
<template>

  <div class="att-list">
    <div v-for="item in data" :key="item.id" class="att-list-item" :class="{'is-active': item.active}" @click="clickAttItem(item)">
      <att-media :medias="item.medias"></att-media>
      <h4 class="att-list-item__title">{{item.name}}</h4>
      <!-- <att-schedules :schedules="schedules[item.aid]" :date="date"></att-schedules> -->
      <att-forecast v-if="forecast && forecast[item.aid]" :forecast="forecast[item.aid]"></att-forecast>
    </div>
  </div>

</template>

<script>
import base from '@/common/mixins/base'
import AttListItem from '@/components/AttList/AttListItem'
import AttMedia from '@/components/Att/AttMedia'
import AttStatus from '@/components/Att/AttStatus'
import AttSchedules from '@/components/Att/AttSchedules'
import AttForecast from '@/components/Att/AttForecast'
import { mapState } from 'vuex'
export default {
  components: { AttListItem, AttMedia, AttSchedules, AttForecast },
  mixins: [base],
  props: {
    date: String,
    data: Array,
    forecast: Object
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      attsWait: state => state.wait.attsWait,
      schedules: state => state.explorer.schedules
    })
  },

  mounted() {
  },

  methods: {
    clickAttItem(row) {
      // console.log(row)
      this.$emit('click-att-item', row.id)
      // row.active = !row.active
    }
  }
}
</script>
