<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.att-marker {
  color: $color-grey;
  text-align: center;

  &--icon {
    &:after {
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 0;
      border-radius: 50% 50% 1px 50%;
      width: 100%;
      height: 100%;
      box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.4);
      background: #fff;
      transform: rotate(45deg);
    }

    width: 35px !important;
    height: 35px !important;
    font-size: 20px;

    &:before {
      position: relative;
      z-index: 1;
      line-height: 35px;
    }
  }

  &--wait {
    width: 45px !important;
    height: auto !important;
  }

  &__content {
    background: #fff;
    box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    padding: 5px 0;
  }

  &__tip {
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

    background: white;
    width: 13px;
    height: 13px;
    margin: -10px auto 0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
    transform: rotate(45deg);
  }

  &__desc {
    font-size: 10px;
    line-height: 1;
  }

  &__num {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.25;
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

    .att-media {
      width: 64px;
      height: 64px;
    }
  }

  &__title {
    line-height: 1;
    font-size: 18px;
    font-weight: 600;
    color: $color-grey;
    margin-bottom: 5px;
  }

  &__desc {
    font-size: 14px;
    margin: 0px;
    margin-top: 5px;
  }

  &__body {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
}
</style>
<template>
  <v-marker :icon="icon" :lat-lng="coordinates">
    <v-popup :options="popupOption">
      <div class="inner" @click="handleClick(data.id)">
        <div class="att-popup__avatar">
          <att-media :medias="data.medias"></att-media>
        </div>
        <div class="att-popup__body">
          <h3 class="att-popup__title">{{data.name}}</h3>
          <att-wait-time mode="live" :text="true" :wait="waits[data.aid]"></att-wait-time>
        </div>
      </div>
    </v-popup>
  </v-marker>
</template>

<script>
import AttWaitTime from '@/components/Att/AttWaitTime'
import { mapState } from 'vuex'

export default {
  components: { AttWaitTime },

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
    handleClick() {

    }
  }
}
</script>
