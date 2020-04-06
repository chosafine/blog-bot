<!-- This template serves as our home page. As of right
  now it only grabs all of the posts from the database
  and then passes them to the post component to be rendered
  but as more functionality is built into the app this will
  act as a controller piece loading in other aspects of the
  app and helping to manage the state of the app. -->
<template>
  <div id="home">
    <Post
      v-for="(post, index) in posts"
      :key="index"
      v-bind:title="post.title"
      v-bind:body="post.body"
    />
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
  beforeMount() {
    this.getPosts();
  }
};
</script>