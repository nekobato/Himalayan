<template>
  <div id="app">
    <router-view/>
    <action-bar />
  </div>
</template>

<script>
import ActionBar from './components/TheActionBar'

export default {
  components: {
    ActionBar
  },
  name: 'app'
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  position: relative;
  height: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  margin: 0;
  padding: 0.5em 0;
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0;
}
a {
  color: #42b983;
}
</style>
