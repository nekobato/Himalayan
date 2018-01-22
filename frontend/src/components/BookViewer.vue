<template>
  <div class="book-viewer">
    <div class="image-container">
      <img class="image" v-if="pages.length" :src="currentPageImageURL" />
    </div>
    <div class="controller">
      <div class="goto-left-page" @click="gotoLeftPage"></div>
      <div class="goto-right-page"  @click="gotoRightPage"></div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api'
import config from '@/config'

export default {
  name: 'BookViewer',
  props: ['uuid'],
  data () {
    return {
      pages: [],
      current: 0
    }
  },
  computed: {
    currentPageImageURL () {
      return `${config.baseURL}image/small/${this.$props.uuid}/${this.$data.pages[this.$data.current]}`
    }
  },
  methods: {
    getBook (uuid) {
      api.get(`book/${uuid}`)
        .then(res => {
          this.$data.pages = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    gotoLeftPage () {
      if (this.$data.current < this.$data.pages.length - 1) {
        this.$data.current += 1
      }
    },
    gotoRightPage () {
      if (this.$data.current !== 0) {
        this.$data.current -= 1
      }
    }
  },
  created () {
    this.getBook(this.$props.uuid)
  }
}
</script>

<style scoped>
h1, h2 {
  margin: 0;
  padding: 0.5em 0;
  font-weight: normal;
}
.book-viewer {
  position: relative;
  height: 100%;
}
.image-container {
  width: 100%;
  height: 100%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.controller {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.goto-left-page {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
}
.goto-right-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
}
</style>
