<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.ticket {
  &-item {
    background: $color-primary;
    color: #FFF;
    border-radius: 10px;
    padding: 20px 18px;
    margin-bottom: 20px;
    position: relative;
    height: 175px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      box-shadow: 1px 2px 5px rgba($color-grey, 0.4);
    }
  }

  &__title {
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 10px;
  }

  &__date {
    font-size: 14px;
  }

  &__desc {
    position: absolute;
    left: 18px;
    bottom: 20px;
    font-size: 13px;
  }

  &__price {
    font-size: 12px;
    position: absolute;
    right: 25px;
    bottom: 20px;
    font-size: 13px;

    &-title {
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 5px;
      margin-left: 3px;
    }

    .price {
      font-size: 15px;
      font-weight: 600;
    }

    i {
      font-style: normal;
      font-size: 12px;
      vertical-align: top;
      line-height: 19px;
      margin-left: -2px;
    }
  }
}
</style>
<template>
  <div @click="handleClick" class="ticket-item">
    <div class="ticket__title">
      {{data.title}}
    </div>
    <div class="ticket__date">
      {{data.daterange}}
    </div>

    <div class="ticket-item-end">
      <div class="ticket__desc">
        {{data.desc}}
      </div>
      <div class="ticket__price">
        <div class="ticket__price-title">
          总计
        </div>
        <span class="price">￥{{data.price}}</span>
        <i>.00</i>
      </div>
    </div>
  </div>
</template>

<script>
const NAME = 'ticket-item'

export default {
  components: {},

  props: {
    data: Object,
    title: String,
    daterange: String,
    desc: String,
    price: Number
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
