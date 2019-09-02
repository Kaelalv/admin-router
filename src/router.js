import Vue from "vue";
import Router from "vue-router";
// import Login from "./views/login/Index.vue";
// import index from "./views/index/index.vue";

Vue.use(Router);
const constantRouterMap = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: Login
  // },
  // {
  //   path: "/index/index",
  //   name: "index",
  //   component: index
  // },
];
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap
});
// [
//   {
//     path: "/",
//     name: "home",
//     component: Login
//   },
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "./views/About.vue")
//   }
// ]
