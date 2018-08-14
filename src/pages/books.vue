<template>
  <Books
    v-bind:books="books"
  />
</template>

<script>
import api from "../api";
import Books from "../components/templates/Books";

export default {
  components: {
    Books
  },
  data() {
    return {
      books: [],
      apiError: null
    };
  },
  mothods: {
    async getBooks() {
      try {
        const res = await api.get("/books");
        this.books = res.data;
      } catch (error) {
        this.apiError = error;
      }
    }
  },
  created() {
    api.get("/books");
  }
};
</script>

<style>
</style>
