<template>
  <div class="admin-index">
    <div class="control-group">
      <h2>本のデータ変更</h2>
      <form method="post" @submit="updateBook">
        <label>
          <span>ID</span>
          <input type="text" name="id" />
        </label>
        <label>
          <span>TITLE</span>
          <input type="text" name="title" />
        </label>
        <label>
          <span>AUTHOR</span>
          <input type="text" name="author" />
        </label>
        <button class="post-button">MODIFY</button>
      </form>
    </div>
    <div class="control-group">
      <h2>Rawに置かれた本を全走査</h2>
      <button class="initialize-button" @click="init">Run</button>
    </div>
    <h2>ユーザー一覧</h2>
    <ul>
      <li v-for="user in data.users" :key="user.username">{{ user.username }}</li>
    </ul>
    <div class="control-group">
      <h2>ユーザー生成</h2>
      <form @submit="addUser">
        <input type="text" v-model="addUserForm.username" />
        <input type="password" v-model="addUserForm.password" />
        <button class="control-button">ADD USER</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'AdminIndex',
  data () {
    return {
      book: {
        id: null,
        title: null,
        author: null
      },
      addUserForm: {
        username: null,
        password: null
      },
      data: {
        users: []
      }
    }
  },
  methods: {
    init () {
      api
        .get('admin/init')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateBook () {},
    addUser () {
      api
        .post('admin/user', {
          username: this.addUserForm.username,
          password: this.addUserForm.password
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    async getUser () {
      return (await api.get('/admin/users')).data
    }
  },
  created () {
    this.getUser()
      .then(users => {
        this.data.users = users
      })
  }
}
</script>

<style lang="scss" scoped>
@import "../variable.scss";
</style>
