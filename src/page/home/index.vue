<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.section-park {
  padding: 30px;
  display: flex;
}

.dm-card-park {
  margin: 0 20px;
  text-align: center;
  color: $color-primary;

  &__icon {
    font-size: 30px;
  }

  &__name {
    color: $color-grey;
  }
}
</style>
<template>
  <div class="container">
    <section>
      <h1 class="title">世界迪士尼乐园</h1>
      <div class="section-park">
        <dm-card class="dm-card-park" v-for="item in LOCAL" :key="item.id">
          <att-icon class="dm-card-park__icon" :name="item.icon"></att-icon>
          <p class="dm-card-park__name">{{$t(item.label)}}</p>
        </dm-card>
      </div>
    </section>
  </div>
</template>

<script>
import LOCAL from 'package/17disney-common/const/local'
export default {
  components: {},

  props: {
  },

  data() {
    return {
      LOCAL
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {

    }
  }
}
</script>
