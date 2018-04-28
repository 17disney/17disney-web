import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      local: state => state.explorer.local,
      attType: state => state.explorer.attType,
      playType: state => state.explorer.playType,

      ticketList: state => state.forecast.ticketList,
      tickets: state => state.forecast.tickets,
      dayList: state => state.forecast.dayList,
      days: state => state.forecast.days,

      weatherHistoryList: state => state.forecast.weatherHistoryList,
      weatherHistorys: state => state.forecast.weatherHistorys,
      weatherForecastList: state => state.forecast.weatherForecastList,
      weatherForecasts: state => state.forecast.weatherForecasts
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
