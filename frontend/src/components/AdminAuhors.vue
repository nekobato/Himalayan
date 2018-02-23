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

.admin-page {
  padding: 0 8px;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;

  & > * {
    margin: 4px;
    width: 320px;
  }

  input,
  button {
    margin-top: 8px;
    border-radius: 4px;
    border: none;
  }

  input[type=text],
  input[type=password] {
    padding: 4px;
    font-size: 16px;
  }

  button {
    padding: 8px;
    background: $color-2;
    font-size: 16px;
    color: $color-4;
  }
}
.initialize-button {
  position: relative;
  padding: 8px 16px;
  background: #ddd;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1;
  color: #444;
  font-weight: bold;
  transition: 0.1s transform ease-out 0s;

  &:active,
  &:hover {
    background: #eee;
  }

  &:active {
    transform: scale(0.92);
  }
}
</style>
