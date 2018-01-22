<template>
  <div class="admin-page">
    <h1>Admin</h1>
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
        <button class="post-button"></button>
      </form>
    </div>
    <div class="control-group">
      <h2>Rawに置かれた本を全走査</h2>
      <button class="initialize-button" @click="init">Run</button>
    </div>
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
      }
    }
  },
  methods: {
    init () {
      api.get('admin/init')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateBook () {
    }
  }
}
</script>

<style lang="less" scoped>
.admin-page {
  padding: 0 8px;
  width: 100%;
  height: 100%;
  overflow: scroll;
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
  transition: .1s transform ease-out 0s;

  &:active,
  &:hover {
    background: #eee;
  }

  &:active {
    transform: scale(.92);
  }
}
</style>
