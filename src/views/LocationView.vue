<template>
  <div class="wrapper">
    <h3 class="text-center">Locations</h3>
    <div class="d-flex">
      <input type="text" placeholder="Type..." class="mr-3 form-control" v-model="filter.type" />
      <button type="button" @click="fetchLocations" class="btn btn-success">Filter</button>
    </div>
    <div v-if="$store.state.locations.info">
      <div class="table-responsive">
        <table class="table table-striped">
          <tr>
            <th class="cursor d-flex" @click="changeSort">Name<span :class="`sort ${sort}`"></span></th>
            <th>Type</th>
            <th>Dimension</th>
          </tr>
          <tr v-for="(item, index) in $store.state.locations.results" :key="`location_${index}`">
            <td><a href="javascript:void(0);" @click="selectLocation(item)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ item.name }}</a></td>
            <td>{{ item.type }}</td>
            <td>{{ item.dimension }}</td>
          </tr>
        </table>
      </div>
      <div class="pagination">
        <select class="form-control" v-model="filter.page" @change="fetchLocations">
          <option v-for="index in $store.state.locations.info.pages" :key="`option_${index}`" :value="index">{{ index }}</option>
        </select>
      </div>
    </div>
    <div v-else class="text-center">No Data</div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby=""
    aria-hidden="true" ref="modalEle">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-if="selectedLocation">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedLocation.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <h6 class="col-sm-4">Type</h6>
              <div class="col-sm-8">{{ selectedLocation.type }}</div>
              <h6 class="col-sm-4">Dimension</h6>
              <div class="col-sm-8">{{ selectedLocation.dimension }}</div>
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
        type: '',
        page: 1
      },
      sort: 'none',
      selectedLocation: undefined,
      isLoading: true,
      characters: []
    }
  },
  created () {
    this.fetchLocations()
  },
  methods: {
    async fetchLocations () {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/location', { params: this.filter })
        console.log(response)
        this.$store.dispatch('updateLocations', response.data)
      } catch (error) {
        this.$store.dispatch('updateLocations', {
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

      const locations = this.$store.state.locations
      locations.results = locations.results.sort((a, b) => {
        if (a.name > b.name) return this.sort === 'up' ? 1 : -1
        if (a.name < b.name) return this.sort === 'up' ? -1 : 1
        return 0
      })
      this.$store.dispatch('updateLocations', locations)
    },
    async selectLocation (item) {
      this.isLoading = true
      this.characters = []
      this.selectedLocation = item
      const ids = item.residents.map(obj => obj.replace('https://rickandmortyapi.com/api/character/', ''))
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
