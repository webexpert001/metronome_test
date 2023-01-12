<template>
  <div class="wrapper">
    <h3 class="text-center">Episodes</h3>
    <div v-if="$store.state.episodes.info">
      <div class="table-responsive">
        <table class="table table-striped">
          <tr>
            <th class="cursor d-flex" @click="changeSort">Episode No.<span :class="`sort ${sort}`"></span></th>
            <th>Name</th>
            <th>Air Date</th>
          </tr>
          <tr v-for="(item, index) in $store.state.episodes.results" :key="`episode_${index}`">
            <td><a href="javascript:void(0);" @click="selectEpisode(item)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ item.episode }}</a></td>
            <td>{{ item.name }}</td>
            <td>{{ item.air_date }}</td>
          </tr>
        </table>
      </div>
      <div class="pagination">
        <select class="form-control" v-model="filter.page" @change="fetchEpisodes">
          <option v-for="index in $store.state.episodes.info.pages" :key="`option_${index}`" :value="index">{{ index }}</option>
        </select>
      </div>
    </div>
    <div v-else class="text-center">No Data</div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby=""
    aria-hidden="true" ref="modalEle">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-if="selectedEpisode">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedEpisode.episode }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <h6 class="col-sm-4">Name</h6>
              <div class="col-sm-8">{{ selectedEpisode.name }}</div>
              <h6 class="col-sm-4">Air Date</h6>
              <div class="col-sm-8">{{ selectedEpisode.air_date }}</div>
              <div v-if="isLoading" class="col-sm-12 text-center mt-3">
                Loading...
              </div>
              <div v-else class="col-sm-12 text-center mt-3">
                <item-characters :characters="characters" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import ItemCharacters from '@/components/ItemCharacters'

export default {
  components: {
    ItemCharacters
  },
  data () {
    return {
      filter: {
        page: 1
      },
      sort: 'none',
      selectedEpisode: undefined,
      isLoading: true,
      characters: []
    }
  },
  created () {
    this.fetchEpisodes()
  },
  methods: {
    async fetchEpisodes () {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode', { params: this.filter })
        this.$store.dispatch('updateEpisodes', response.data)
      } catch (error) {
        this.$store.dispatch('updateEpisodes', {
          info: undefined,
          results: []
        })
      }
    },
    changeSort () {
      if (this.sort === 'none') {
        this.sort = 'up'
      } else {
        this.sort = (this.sort === 'up' ? 'down' : 'up')
      }

      const episodes = this.$store.state.episodes
      episodes.results = episodes.results.sort((a, b) => {
        if (a.episode > b.episode) return this.sort === 'up' ? 1 : -1
        if (a.episode < b.episode) return this.sort === 'up' ? -1 : 1
        return 0
      })
      this.$store.dispatch('updateEpisodes', episodes)
    },
    async selectEpisode (item) {
      this.isLoading = true
      this.characters = []
      this.selectedEpisode = item
      const ids = item.characters.map(obj => obj.replace('https://rickandmortyapi.com/api/character/', ''))
      const idString = ids.join(',')
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${idString}`)
      if (ids.length > 1) {
        this.characters = response.data
      } else {
        this.characters.push(response.data)
      }
      this.isLoading = false
    }
  }
}
</script>
