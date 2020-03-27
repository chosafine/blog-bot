import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./components/Home.vue"
import CreatePost from "./components/CreatePost.vue";
import Login from "./components/Login.vue";

// Calling our router
Vue.use(VueRouter);
Vue.config.productionTip = false;

// Defining the various routes and what components they should load
const routes = [
    {path: '/', component: Home},
    {path: '/post', component: CreatePost},
    {path: '/login', component: Login}
];

// Initializing our router
const router = new VueRouter({
    mode: 'history',
    routes
});

// Creating a new vue instance, passing in our router and 
// telling what html element to mount it onto
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
