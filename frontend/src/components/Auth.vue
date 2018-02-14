<template>
  <div class="auth">
    <h2>Auth</h2>
    <form class="auth-form" @submit="auth">
      <input type="text" v-model="username" placeholder="USERNAME" />
      <input type="password" v-model="password" placeholder="PASSWORD" />
      <button>LOGIN</button>
    </form>
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'Auth',
  data () {
    return {
      username: String,
      password: String
    }
  },
  computed: {
  },
  methods: {
    auth () {
      api.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
