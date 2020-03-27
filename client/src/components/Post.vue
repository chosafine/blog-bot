<!-- This template serves as our post component. It takes
  props of a title and body (TBA: audio file for podcasts),
  and then renders it as HTML. TBA: Add an audio player for
  podcast posts and styling options. -->
<template>
  <div class="article">
    <article>
      <h3>{{ title }}</h3>
      <p>{{ body }}</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "Post",
  props:["title","body"],
};
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
