<template>
  <div id="home">
    <Post v-for="(post, index) in posts" :key="index" v-bind:title="post.title" v-bind:body="post.body"/>
  </div>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Home",
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