<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

// .att-list {
//   // display: flex;

//   // flex-wrap: wrap;
//   &__item {
//     padding: 8px 16px;
//     background: #FFF;
//     width: 25%;
//     cursor: pointer;
//     text-align: center;

//     &.is-active {
//       border: 1px solide @color-primary;
//     }

//     &__title {
//       color: $color-dark-grey;
//       font-size: 14px;
//       font-weight: 500;
//     }
//   }
// }
</style>
<template>
  <div class="att-list">
    <div class="att-list__item" :class="{'is-active': item.active}" v-for="item in data" :key="item.id" @click="clickAttItem(item)">
      <att-media :medias="item.medias"></att-media>
      <h4 class="att-item__title">{{item.name}}</h4>
    </div>
  </div>
</template>

<script>
import AttListItem from '@/components/AttList/AttListItem'
import { mapState } from 'vuex'
export default {
  components: { AttListItem },

  props: {
    data: {
      type: Array
    }
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
