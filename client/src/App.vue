<template>
  <div id="app">
    <Nav />
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav
  },
  data () {
    return {
    }
  }
};
</script>