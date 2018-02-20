<template>
  <div class="auth">
    <h1>Book Cafe</h1>
    <form class="auth-form" @submit.prevent="auth">
      <input class="form-item form-input" type="text" v-model="username" placeholder="USERNAME" />
      <input class="form-item form-input" type="password" v-model="password" placeholder="PASSWORD" />
      <button class="form-item form-button">LOGIN</button>
    </form>
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'Auth',
  data () {
    return {
      username: '',
      password: ''
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
        if (res.status === 200 && res.data.user) {
          this.$router.push('books')
        } else {
          this.$router.replace('/')
        }
      }).catch(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../variable.scss";

.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
}
.auth-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 320px;
}
.form-input {
  padding: 8px;
  font-size: 16px;
}
.form-button {
  padding: 8px;
  background: $color-2;
  font-size: 16px;
  color: $color-4;
}
.form-item {
  width: 100%;
  margin-top: 8px;
  border-radius: 4px;
  border: none;
}
</style>
