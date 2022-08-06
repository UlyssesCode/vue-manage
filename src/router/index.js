import Vue from "vue";
import VueRouter from "vue-router";
import mainPage from "../views/mainPage.vue";
import homePage from "../views/homePage.vue";
// import userPage from "../views/userPage.vue";
// import mallPage from "../views/mallPage.vue";
// import pageOne from "../views/other/pageOne.vue";
// import pageTwo from "../views/other/pageTwo.vue";
import loginPage from "../views/loginPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "mainPage",
    component: mainPage,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: homePage,
      },
      // {
      //   path: "user",
      //   name: "User",
      //   component: userPage,
      // },
      // {
      //   path: "mall",
      //   name: "Mall",
      //   component: mallPage,
      // },
      // {
      //   path: "page1",
      //   name: "page1",
      //   component: pageOne,
      // },
      // {
      //   path: "page2",
      //   name: "page2",
      //   component: pageTwo,
      // },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
