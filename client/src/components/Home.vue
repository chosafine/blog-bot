<template>
  <div id="app">
    <Post v-for="(post, index) in posts" :key="index" v-bind:title="post.title" v-bind:body="post.body"/>
  </div>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "App",
  components: {
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
  },
   beforeMount(){
    this.getPosts();
 },
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
