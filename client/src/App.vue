<template>
  <div id="app">
    <Nav />
    <Post />
    <button v-on:click="getPosts">Load Posts</button>
      <Post v-for="(post, index) in posts" :key="index" v-bind:title="post.title" v-bind:body="post.body"/>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Post from "./components/Post.vue";

export default {
  name: "App",
  components: {
    Nav,
    Post
  },
   data() {
    return {
      posts: []
    };
  },
  methods: {
    getPosts() {
      fetch("http://localhost:3001/all")
        .then(response => response.json())
        .then(data => (this.posts = data));
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
