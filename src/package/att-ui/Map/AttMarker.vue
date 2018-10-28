<style lang='stylus'>
@require '../../../styles/disney/var/color.styl';

marker-box() {
  border-radius: 8px;
  font-weight: 800;
  font-size: 22px;
  line-height: 45px;
  background: #FFF;
  width: 48px !important;
  height: 45px !important;
  border: 0.5px solid $color-light-grey-s;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.4);
}

.att-marker {
  color: $color-grey;
  text-align: center;

  // icon 模式
  &--icon {
    width: 35px !important;
    height: 35px !important;
    line-height: 35px !important;
    font-size: 22px;

    &:after {
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 0;
      background: #FFF;
      border-radius: 50% 50% 2px 50%;
      width: 100%;
      height: 100%;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
      transform: rotate(45deg);
    }

    &:before {
      position: relative;
      z-index: 1;
      line-height: 35px;
    }
  }

  // 等候时间模式
  &--detail {
    width: 50px !important;
    height: auto !important;

    .att-marker__content {
      padding: 8px 0;
    }
  }

  &--more {
    width: 48px !important;
    height: 45px !important;
    font-size: 23px;
    line-height: 45px !important;

    .att-marker__content {
      border: 0.5px solid $color-light-grey-s;
      padding: 8px 0;

      &:after {
        content: '';
        position: absolute;
        bottom: 0px;
        height: 1px;
        left: 15px;
        right: 15px;
        background: #FFF;
      }
    }

    .att-marker__num {
      font-size: 23px;
    }

    .att-marker__tip {
      z-index: 12;
      border: 0.5px solid $color-light-grey-s;
    }
  }

  &__child-1 {
    marker-box();
    position: absolute;
    left: -5px;
    top: -10px;
    z-index: -1;
  }

  &__child-2 {
    marker-box();
    position: absolute;
    left: 5px;
    top: -5px;
    z-index: -1;
  }

  &__desc {
    font-size: 11px;
    line-height: 1;
  }

  &__num {
    font-weight: 800;
    font-size: 18px;
    line-height: 1.2;
  }

  &__content {
    background: #FFF;
    box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    padding: 5px 0;
  }

  // 下标记
  &__tip {
    background: #FFF;
    width: 14px;
    height: 14px;
    margin: -7px auto 0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
    transform: rotate(45deg);

    &__container {
      width: 40px;
      height: 20px;
      position: absolute;
      left: 50%;
      margin-left: -20px;
      overflow: hidden;
      pointer-events: none;
      overflow: hidden;
      pointer-events: none;
    }
  }
}

.att-popup {
  border-radius: 10px;
  cursor: pointer;

  :active {
    background: #eee;
  }

  .att-wait-time {
    margin-top: 3px;
    font-size: 18px;
  }

  .leaflet-popup-tip-container {
    display: none;
  }

  .leaflet-popup-content-wrapper {
    border-radius: 8px;
  }

  .leaflet-popup-tip {
    width: 13px;
    height: 13px;
  }

  .leaflet-popup-content {
    margin: 16px;
  }

  .inner {
    display: flex;
  }

  &__avatar {
    margin-right: 16px;
  }

  &__title {
    line-height: 1.3;
    color: $color-grey;
    font-size: 18px;
    font-weight: 600;
  }

  &__desc {
    margin: 0px;
    color: $color-grey;
    font-size: 14px;
  }

  &__body {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .att-wait-time {
    color: $color-grey;
  }
}
</style>
<template>
  <v-marker :icon="icon" :lat-lng="coordinates">
    <v-popup :options="popupOption">
      <div class="inner" @click="handleClick(data.id)">
        <div class="att-popup__avatar">
          <att-media size="large" :medias="data.medias"></att-media>
        </div>
        <div class="att-popup__body">
          <h3 class="att-popup__title">{{data.name}}</h3>
          <div class="att-popup__desc">{{data.landName}}</div>
          <att-wait-time mode="live" :text="true" :wait="waits[data.aid]"></att-wait-time>
        </div>
      </div>
    </v-popup>
  </v-marker>
</template>

<script>
import { mapState } from 'vuex'

const NAME = 'att-marker'
export default {
  name: NAME,

  components: {},

  props: {
    icon: Object,
    coordinates: Array,
    data: Object
  },

  data() {
    return {
      popupOption: {
        autoClose: false,
        closeButton: false,
        minWidth: 300,
        className: 'att-popup'
      }
    }
  },

  computed: {
    ...mapState({
      waits: state => state.explorer.waits
    })
  },

  mounted() { },

  methods: {
    handleClick(id) {
      this.$emit('click', id)
    }
  }
}
</script>
