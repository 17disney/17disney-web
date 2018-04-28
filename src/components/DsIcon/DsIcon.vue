<template>
  <div class="icon--pep" :class="'icon__' + name"></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {}
}

</script>
<style lang='less'>
.icon--pep {
  line-height: 1;
}
</style>
