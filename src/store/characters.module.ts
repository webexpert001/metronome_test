export default {
  state: {
    info: undefined,
    results: []
  },
  mutations: {
    UPDATE_CHARACTERS (state: any, payload: any) {
      state.results = payload.results
      state.info = payload.info
    }
  },
  actions: {
    updateCharacters (context: any, payload: any) {
      context.commit('UPDATE_CHARACTERS', payload)
    }
  }
}
