<template>
  <div class="admin-page">
    <h1>Admin</h1>
    <nav>
      <router-link to="/admin/books">Books</router-link>
      <router-link to="/admin/authors">Authors</router-link>
    </nav>
    <router-view />
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
