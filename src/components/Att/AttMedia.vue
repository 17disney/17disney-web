<style lang='stylus'>
.att-media {
  border-radius: 5px;
  overflow: hidden;

  &--finderListMobileSquare {
    width: 48px;
    height: 48px;

    &.size-small {
      width: 36px;
      height: 36px;
    }
  }

  &--finderDetailMobileHero {
    max-width: 600px;
  }

  >img {
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="att-media" :class="['att-media--' + type, 'size-' + size]"><img :src="url" alt=""></div>
</template>

<script>
export default {
  components: {},

  props: {
    medias: {
      type: Array
    },
    type: {
      type: String,
      default: 'finderListMobileSquare'
    },
    size: {
      type: String
    }
  },

  data() {
    return {
    }
  },

  computed: {
    url: function() {
      return this.medias.find(_ => _.type === this.type)['url']
    }
  },

  mounted() {

  },

  methods: {}
}
</script>
