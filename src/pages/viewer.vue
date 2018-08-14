<template>
  <Viewer
    v-bind:book="book"
  />
</template>

<script>
import Viewer from "../components/templates/Viewer";
export default {
  components: {
    Viewer
  }
};
</script>

<style>
</style>
