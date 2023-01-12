<template>
  <header>
    <img alt="Vue logo" src="../assets/logo.png" height="50">
    <p>API Test</p>
    <nav>
      <router-link to="/">Characters</router-link> |
      <router-link to="/locations">Locations</router-link> |
      <router-link to="/episodes">Episodes</router-link>
    </nav>
  </header>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
