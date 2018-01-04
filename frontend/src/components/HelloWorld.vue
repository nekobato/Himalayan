<template>
  <div class="hello">
    <h2>Thumbnails</h2>
    <ul class="book-list">
      <li v-for="book in books">
        <a class="book-link" href="https://vuejs.org" target="_blank">
          <img class="thumbnail" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      books: new Array(10)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  margin: 0;
  padding: 0.5em 0;
  font-weight: normal;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 4px;
}
a {
  color: #42b983;
}
.thumbnail {
  /* 1:√1 */
  width: 120px;
  height: 170px;
  object-fit: contain;
}
.book-link {
  display: block;
}
</style>
