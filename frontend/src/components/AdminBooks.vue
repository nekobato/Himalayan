<template>
  <div class="admin-books">
    <h2>Books</h2>
    <table class="book-table">
      <thead>
        <tr>
          <td></td>
          <td>Book Title</td>
          <td>Author Name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in booksData.books" :key="book._id">
          <td><img class="thumbnail-image" :src="book.thumbnailURL" /></td>
          <td><input class="book-title" type="text" v-model="book.title" @change="onTitleChanged(book)" /></td>
          <td>{{ book.author.name }}</td>
          <td><button @click="changeData(book)" v-show="book.changed">CHANGE</button></td>
        </tr>
      </tbody>
    </table>
    <div class="pager">
      <router-link class="pager-link" v-if="prevURL" v-bind:to="prevURL">＜</router-link>
      <span class="pager-link">{{ currentPage }}</span>
      <router-link class="pager-link" v-if="nextURL" v-bind:to="nextURL">＞</router-link>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import config from '@/config'
import api from '@/lib/api'

export default {
  name: 'AdminBooks',
  data () {
    return {
      booksData: []
    }
  },
  computed: {
    prevURL () {
      if (!this.booksData.page) return null
      if (this.booksData.page > 1) {
        return { path: '/books', query: { page: this.booksData.page - 1 } }
      }
    },
    currentPage () {
      return this.booksData.page
    },
    nextURL () {
      if (!this.booksData.page) return null
      if (this.booksData.count > this.booksData.offset + this.booksData.limit) {
        return { path: '/books', query: { page: this.booksData.page + 1 } }
      }
    }
  },
  methods: {
    changeData (book) {
      api.post(`book/${book.uuid}`, {
        title: book.title
      })
        .then(res => {
          book.changed = false
          console.log(res.data)
        })
        .catch(err => { throw err })
    },
    initBooks () {
      this.booksData.books = _.map(this.booksData.books, book => {
        book.thumbnailURL = `${config.baseURL}image/thumbnail/${book.uuid}.jpg`
        book.link = `book/${book.uuid}`
        book.changed = false
        return book
      })
    },
    onTitleChanged (book) {
      book.changed = true
    }
  },
  created () {
    api.get('/books')
      .then(res => {
        this.booksData = res.data
        this.initBooks()
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
  margin: 0 auto;
  text-align: left;

  td {
    padding: 2px 4px;
  }

  input {
    padding: 8px 4px;
    background: rgba(255, 255, 255, 0.7);
    border: none;
  }

  .thumbnail-image {
    width: 48px;
    height: 48px;
    content-fit: contain;
  }

  .book-title {
    width: 400px;
  }

  .book-author {
    width: 160px;
  }
}
.pager {
  margin: 24px auto;
  .book-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  }
  .pager-link {
    display: inline-block;
    padding: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #999;
  }
}

</style>
