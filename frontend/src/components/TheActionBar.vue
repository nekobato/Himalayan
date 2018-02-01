<template>
  <nav class="action-bar">
    <router-link to="Admin" class="action-button">ADMIN</router-link>
  </nav>
</template>

<script>
export default {
  name: 'ActionBar',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.action-bar {
  position: absolute;
  bottom: 0;
  display: none;
  padding: 0 8px;
  width: 100%;
  height: 48px;
  background-color: #ddd;
}

.action-button {
  padding: 0 16px;
  font-size: 16px;
  line-height: 48px;
  color: #666;
  font-weight: bold;
}
</style>
