<template>
  <div class="wrapper">
    <h3 class="text-center">Characters</h3>
    <div class="d-flex">
      <select v-model="filter.status" class="mr-3 form-control">
        <option value="">Select Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select v-model="filter.gender" class="mr-3 form-control">
        <option value="">Select Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <input type="text" placeholder="Name..." class="mr-3 form-control" v-model="filter.name" />
      <button type="button" @click="fetchCharacters" class="btn btn-success">Filter</button>
    </div>
    <div v-if="$store.state.characters.info">
      <item-characters :characters="$store.state.characters.results" />

      <div class="pagination">
        <select v-model="filter.page" class="form-control" @change="fetchCharacters">
          <option v-for="index in $store.state.characters.info.pages" :key="`option_${index}`" :value="index">{{ index }}</option>
        </select>
      </div>
    </div>
    <div v-else class="text-center">No Data</div>
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
        status: '',
        gender: '',
        name: '',
        page: 1
      }
    }
  },
  created () {
    this.fetchCharacters()
  },
  methods: {
    async fetchCharacters () {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', { params: this.filter })
        this.$store.dispatch('updateCharacters', response.data)
      } catch (error) {
        this.$store.dispatch('updateCharacters', {
          info: undefined,
          results: []
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  max-width: 960px;
  margin: 0 auto;
}

p,
h3 {
  grid-column: span 3;
}

select {
  padding: 8px;
}
input {
  padding: 8px;
}
.mr-3 {
  margin-right: 12px;
}
button {
  padding: 8px 16px;
  background: #42b983;
  border: 1px solid #42b983;
  color: #fff;
}
</style>
