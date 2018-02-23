<template>
  <div class="admin-books">
    <h2>Books</h2>
    <table class="book-table">
      <thead>
        <tr>
          <td>Book Title</td>
          <td>Author Name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td><input class="book-title" type="text" v-model="book.title" /></td>
          <td>{{ book.author.name }}</td>
          <td><button @click="changeData(book)">CHANGE</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'AdminBooks',
  data () {
    return {
      books: []
    }
  },
  methods: {
    changeData (book) {
      api.post(`book/${book.uuid}`, {
        title: book.title
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => { throw err })
    }
  },
  created () {
    api.get('/books')
      .then(res => {
        this.books = res.data.books
      })
      .catch(err => { throw err })
  }
}
</script>

<style lang="scss" scoped>
@import "../variable.scss";

.admin-page {
  padding: 0 8px;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.book-table {
  text-align: left;

  input {
    padding: 8px 4px;
    background: rgba(255, 255, 255, 0.7);
    border: none;
  }

  .book-title {
    width: 400px;
  }

  .book-author {
    width: 160px;
  }
}
</style>
