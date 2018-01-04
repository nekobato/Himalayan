<template>
  <div id="app">
    <action-bar />
    <router-view/>
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
</style>
