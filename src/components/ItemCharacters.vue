<template>
  <table class="table table-striped">
    <tr>
      <th>Name</th>
      <th>Species</th>
      <th>Status</th>
      <th>Gender</th>
      <th>Origin.Name</th>
    </tr>
    <tr v-for="(item, index) in characters" :key="`charactor_${index}`" class="tr-relative cursor">
      <td>{{ item.name }}</td>
      <td>{{ item.species }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.gender }}</td>
      <td>{{ item.origin.name }}</td>
      <div class="image-div">
        <div class="image">
          <img :src="item.image" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </tr>
  </table>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    characters: {
      type: Array,
      required: true
    }
  }
}
</script>
