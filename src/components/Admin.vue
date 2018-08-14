<template>
  <div class="admin-page">
    <aside>
      <div class="collection">
        <p class="collection-item">Admin</p>
        <router-link class="collection-item" to="/admin/books">Books</router-link>
        <router-link class="collection-item" to="/admin/authors">Authors</router-link>
      </div>
    </aside>
    <router-view class="container" />
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'AdminPage',
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

.admin-page {
  display: flex;
  height: 100%;
  text-align: left;
  background: #fff;
}

aside {
  width: 320px;
  height: 100%;
  padding: 16px;
}
</style>
