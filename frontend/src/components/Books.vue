<template>
  <div class="books">
    <h2>Books</h2>
    <ul class="book-list">
      <li class="book-cell"
        v-for="book in books"
        :key="book.title"
        :style="{ width: cell.width + 'px', height: cell.height + 'px' }">
        <router-link :to="book.link" class="book-link" >
          <img class="thumbnail-image" :src="book.thumbnailURL" />
          <div class="book-info">
            <div class="book-title"><span class="info-text">{{ book.title }}</span></div>
            <div class="book-author"><span class="info-text">{{ book.author.name }}</span></div>
          </div>
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
      booksRaw: [],
      windowWidth: null
    }
  },
  computed: {
    books () {
      return _.map(this.$data.booksRaw, book => {
        book.thumbnailURL = `${config.baseURL}image/thumbnail/${book.uuid}.jpg`
        book.link = `book/${book.uuid}`
        return book
      })
    },
    cell () {
      let cellMinWidth = 120
      let offset = (this.windowWidth % cellMinWidth) / Math.floor(this.windowWidth / cellMinWidth)
      return {
        width: cellMinWidth + offset - 8,
        height: (cellMinWidth + offset - 8) * 1.414
      }
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
    },
    setWindowWidth: _.debounce(function () {
      this.windowWidth = window.innerWidth
    }, 300)
  },
  created () {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.setWindowWidth)
    this.getBooks()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setWindowWidth, false)
  }
}
</script>

<style scoped>
.books {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.book-cell {
  position: relative;
  margin: 4px;
}
.thumbnail-image {
  /* 1:√1 */
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid #ddd;
}
.book-info {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  text-align: left;
}
.book-title,
.book-author {
  display: inline;
  margin: 4px 0 0;
}
.info-text {
  background: rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  font-size: 16px;
  color: #fff;
}
.book-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
</style>
