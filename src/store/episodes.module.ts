export default {
  state: {
    info: undefined,
    results: []
  },
  mutations: {
    UPDATE_EPISODES (state: any, payload: any) {
      state.results = payload.results
      state.info = payload.info
    }
  },
  actions: {
    updateEpisodes (context: any, payload: any) {
      context.commit('UPDATE_EPISODES', payload)
    }
  }
}
