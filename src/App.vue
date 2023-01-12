<template>
  <app-header />
  <router-view />
  <app-footer />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
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
table {
  width: 100%;
  tr {

    td,
    th {
      padding: 8px;
    }

    &:nth-child(even) {
      background-color: #eee;
    }
  }
}
.tr-relative {
  position: relative;

  .image-div {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 300px;
    display: none;
    z-index: 10;

    .image {
      position: relative;
      width: 100%;
      padding-top: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      p {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 8px 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        text-align: center;
        margin: 0;
      }
    }
  }

  &:hover {
    .image-div {
      display: block;
    }
  }
}
.cursor {
  cursor: pointer;
}
.sort {
  width: 16px;
  height: 16px;
  background-size: contain;
  position: relative;
  display: inline-block;
  margin-left: 6px;

  &.none {
    background-image: url('./assets/none.png');
  }

  &.up {
    background-image: url('./assets/up.png');
  }

  &.down {
    background-image: url('./assets/down.png');
  }
}
.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination {
  max-width: 140px;
  margin: 0 auto;
}
</style>
