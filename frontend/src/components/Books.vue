<template>
  <div class="hello">
    <h2>Books</h2>
    <ul class="book-list">
      <li v-for="book in books" :key="book.title">
        <router-link :to="book.link" class="book-link" >
          <img class="thumbnail" :src="book.thumbnailURL" />
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
        book.thumbnailURL = `${config.baseURL}/image/thumbnail/${book.uuid}.jpg`
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
h1, h2 {
  margin: 0;
  padding: 0.5em 0;
  font-weight: normal;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 4px;
}
a {
  color: #42b983;
}
.thumbnail {
  /* 1:√1 */
  width: 120px;
  height: 170px;
  object-fit: contain;
}
.book-link {
  display: block;
}
</style>
