<template>
  <div class="admin-page">
    <h1>Admin</h1>
    <button class="initialize-button">リストアップ</button>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
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
