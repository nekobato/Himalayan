<template>
  <div class="books">
    <h2>Books</h2>
    <ul class="book-list">
      <li v-for="book in books" :key="book.title">
        <router-link :to="book.link" class="book-link" >
          <img class="thumbnail" :src="book.thumbnailURL" />
          <span class="book-title">{{ book.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import api from '@/lib/api'
import config from '@/config'

export default {
  name: 'Books',
  data () {
    return {
      booksRaw: []
    }
  },
  computed: {
    books () {
      return _.map(this.$data.booksRaw, book => {
        book.thumbnailURL = `${config.baseURL}image/thumbnail/${book.uuid}.jpg`
        book.link = `book/${book.uuid}`
        return book
      })
    }
  },
  methods: {
    getBooks () {
      api.get('books')
        .then(res => {
          this.$data.booksRaw = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getBooks()
  }
}
</script>

<style scoped>
.books {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.thumbnail {
  /* 1:√1 */
  width: 120px;
  height: 170px;
  object-fit: contain;
  border: 1px solid #ddd;
}
.book-title {
  display: block;
  font-size: 16px;
  color: #444;
}
.book-link {
  display: block;
  text-decoration: none;
}
</style>
