import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      local: state => state.explorer.local,
      schedules: state => state.explorer.schedules,
    }),
    ...mapGetters(['attListFilter', 'attractionList', 'attFind'])
  },

  methods: {
    ...mapActions([
      'getDestinationsList',
      'getDestinationsRawList',
      'getAttractionsWait',
      'getSchedules',
      'getParkCountList',
      'getTickets',
      'getDays',
      'getWeatherHistory'
    ])
  }
}
