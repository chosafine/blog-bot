import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./components/Home.vue"

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
    {path: '/', component: Home}
];

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
