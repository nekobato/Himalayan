<template>
  <div class="auth">
    <div class="background">
      <div class="rect-object rect-1" ref="rect1"></div>
      <div class="rect-object rect-2" ref="rect2"></div>
      <div class="rect-object rect-3" ref="rect3"></div>
      <div class="rect-object rect-4" ref="rect4"></div>
    </div>
    <h1 class="title">Book Cafe</h1>
    <form class="auth-form">
      <input class="form-item form-input" type="text" placeholder="USERNAME" />
      <input class="form-item form-input" type="password" placeholder="PASSWORD" />
      <button class="form-item form-button">LOGIN</button>
    </form>
  </div>
</template>

<script>
import anime from 'animejs'
import randomColor from 'random-color'
import api from '@/lib/api'

export default {
  name: 'Auth',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    checkAuthStatus () {
      api.get('/auth/status')
        .then(res => {
          if (res.status === 200 && res.data.status === true) {
            this.$router.replace('books')
          }
        }).catch(err => {
          console.error(err)
          alert(err)
        })
    },
    nextPageAnimation () {
      let animation = anime.timeline()
      animation.add({
        targets: this.$refs.rect4,
        translateX: '-100%',
        duration: 1000,
        easing: 'easeInQuad'
      }).add({
        targets: this.$refs.rect2,
        translateX: '-100%',
        duration: 1000,
        easing: 'easeOutQuad',
        complete: () => {
          this.nextColoring()
          setTimeout(animation.restart, 500)
        }
      })
    },
    nextColoring () {
      this.$refs.rect1.style.backgroundColor = this.$refs.rect2.style.backgroundColor
      this.$refs.rect2.style.transform = ''
      this.$refs.rect2.style.backgroundColor = randomColor(0.3, 0.5).hexString()
      this.$refs.rect3.style.backgroundColor = this.$refs.rect4.style.backgroundColor
      this.$refs.rect4.style.transform = ''
      this.$refs.rect4.style.backgroundColor = randomColor(0.3, 0.5).hexString()
    }
  },
  mounted () {
    this.checkAuthStatus()
    this.$refs.rect1.style.backgroundColor = randomColor(0.3, 0.5).hexString()
    this.$refs.rect2.style.backgroundColor = randomColor(0.3, 0.5).hexString()
    this.$refs.rect3.style.backgroundColor = randomColor(0.3, 0.5).hexString()
    this.$refs.rect4.style.backgroundColor = randomColor(0.3, 0.5).hexString()
    this.nextPageAnimation()
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
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  .rect-object {
    position: absolute;
    height: 100%;
    width: 50%;
    &.rect-1 {
      left: 0;
    }
    &.rect-2 {
      left: 50%;
    }
    &.rect-3 {
      left: 50%;
    }
    &.rect-4 {
      left: 100%;
    }
  }
}
.title,
.auth-form {
  position: relative;
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
