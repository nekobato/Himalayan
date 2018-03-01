<template>
  <div class="book-viewer">
    <div class="image-container">
      <img class="image" v-if="pages.length" :src="currentPageImageURL" />
    </div>
    <div class="progress">
      <div class="progress-current" :style="{ width: progressPercent + '%' }"></div>
    </div>
    <div class="controller">
      <div class="transparent-button goto-left-page" @click="gotoLeftPage"></div>
      <div class="transparent-button goto-right-page"  @click="gotoRightPage"></div>
      <div class="transparent-button open-settings"  @click="openSettings"></div>
      <div class="transparent-button goto-left-book"  @click="gotoLeftBook"></div>
      <div class="transparent-button goto-right-book"  @click="gotoRightBook"></div>
      <div class="transparent-button show-progress"  @click="showProgress"></div>
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
      current: 0,
      relations: {}
    }
  },
  computed: {
    currentPageImageURL () {
      let size = window.innerHeight > 640 ? 'big' : 'small'
      return `${config.baseURL}image/${size}/${this.$props.uuid}/${this.$data.pages[this.$data.current]}`
    },
    progressPercent () {
      return (this.current + 1) / this.pages.length * 100
    }
  },
  methods: {
    getBook () {
      api.get(`book/${this.$props.uuid}`)
        .then(res => {
          if (res.status === 403) return this.$route.replace('/auth')
          this.$data.pages = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRelations () {
      api.get(`book/${this.$props.uuid}/relations`)
        .then(res => {
          if (res.status === 403) return this.$route.replace('/auth')
          this.$data.relations = res.data
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
    },
    gotoLeftBook () {

    },
    openSettings () {

    },
    gotoRightBook () {

    },
    showProgress () {

    }
  },
  created () {
    this.getBook()
    this.getRelations()
  }
}
</script>

<style scoped>
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
.progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
}
.progress-current {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 4px;
  background: #f00;
}
.controller {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.transparent-button {
  position: absolute;
  margin: auto;
  /* border: 1px solid #000; */
}
.goto-left-page {
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
  height: 60%;
}
.goto-right-page {
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  height: 60%;
}
.open-settings {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 20%;
  height: 60%;
}
.goto-left-book {
  left: 0;
  bottom: 0;
  width: 30%;
  height: 20%;
}
.goto-right-book {
  right: 0;
  bottom: 0;
  width: 30%;
  height: 20%;
}
.show-progress {
  left: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  height: 20%;
}
</style>
