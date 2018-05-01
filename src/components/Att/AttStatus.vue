<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

@keyframes antStatusProcessing {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }

  to {
    transform: scale(2.4);
    opacity: 0;
  }
}

.att-status {
  &__badge {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

  &__text {
    font-size: 14px;
    margin-left: 8px;
    color: $color-gray;
  }

  &.static {
    &-processing {
      .att-status__text {
        // color: $color-primary;
      }

      .att-status__badge {
        background-color: $color-primary;

        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid $color-primary;
          content: '';
          // animation: antStatusProcessing 1.2s infinite ease-in-out;
        }
      }
    }

    &-default {
      .att-status__text {
        // color: #999;
      }

      .att-status__badge {
        background-color: #999;
      }
    }

    &-error {
      .att-status__text {
        // color: $color-red;
      }

      .att-status__badge {
        background-color: $color-red;
      }
    }
  }
}
</style>
<template>
  <div class="att-status" :class="cssList[status]">
    <span class="att-status__badge"></span>
    <span class="att-status__text">{{textList[status]}}</span>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    status: {
      type: String
    }
  },

  data() {
    return {
      textList: {
        Operating: '开放',
        Closed: '关闭',
        Renewal: '计划性维护',
        Refurbishment: '计划性维护',
        Down: '暂时关闭'
      },
      cssList: {
        Operating: 'static-processing',
        Closed: 'static-default',
        Renewal: 'static-error',
        Refurbishment: 'static-error',
        Down: 'static-error'
      }
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
