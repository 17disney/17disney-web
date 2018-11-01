<style lang='stylus'>
@require '../../../styles/disney/var/color.styl';

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
    font-size: 13px;
    margin-left: 8px;
    color: $color-primary-dark;
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
          animation: antStatusProcessing 1.2s infinite ease-in-out;
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
    <span class="att-status__text">{{$t('ds.status.' + textList[status])}}</span>
  </div>
</template>

<script>
export default {
  name: 'att-status',

  props: {
    status: {
      type: String
    }
  },

  data() {
    return {
      textList: {
        Operating: 'operating',
        'Extra Magic Hours': 'extraMagicHours',
        Closed: 'closed',
        Renewal: 'renewal',
        Refurbishment: 'refurbishment',
        Down: 'down'
      },
      cssList: {
        Operating: 'static-processing',
        'Extra Magic Hours': 'static-processing',
        Closed: 'static-default',
        Renewal: 'static-error',
        Refurbishment: 'static-error',
        Down: 'static-error'
      }
    }
  }
}
</script>
