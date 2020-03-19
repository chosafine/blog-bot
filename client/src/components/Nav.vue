<template>
  <div class="nav">
    <h3>blog bot</h3>
    <ul>
      <li><a href="/">home</a></li>
      <li><a href="/login">login</a></li>
      <li><a href="/logout">logout</a></li>
      <li><a href="/post">post</a></li>
      <li><a href="/rss">RSS</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
