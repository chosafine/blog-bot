<!-- This template serves as our default app view
 the nav bar is static (minus the logout button only
 showing if a user is logged in). The content of the page
 is dictated by the router component and what url the user
 is loading -->
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