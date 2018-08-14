<template>
  <div class="admin-authors">
    <h2>Authors</h2>
    <table class="author-table">
      <thead>
        <tr>
          <td>Author Name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author._id">
          <td><input class="author-name" type="text" v-model="author.name" /></td>
          <td><button @click="changeData(author)">CHANGE</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'AdminAuthors',
  data () {
    return {
      authors: []
    }
  },
  methods: {
    changeData (author) {
      api.post(`author/${author.uuid}`, {
        name: author.name
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => { throw err })
    }
  },
  created () {
    api.get('/authors')
      .then(res => {
        this.authors = res.data
      })
      .catch(err => { throw err })
  }
}
</script>

<style lang="scss" scoped>
@import "../variable.scss";

</style>
