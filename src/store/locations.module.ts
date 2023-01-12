export default {
  state: {
    info: undefined,
    results: []
  },
  mutations: {
    UPDATE_LOCATIONS (state: any, payload: any) {
      state.results = payload.results
      state.info = payload.info
    }
  },
  actions: {
    updateLocations (context: any, payload: any) {
      context.commit('UPDATE_LOCATIONS', payload)
    }
  }
}
