import { createStore } from 'vuex'
import CharacterModule from './characters.module'
import LocationModule from './locations.module'
import EpisodeModule from './episodes.module'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    characters: CharacterModule,
    locations: LocationModule,
    episodes: EpisodeModule
  }
})
