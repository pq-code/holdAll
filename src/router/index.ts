import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

import webgpu from "./branch/webgpu";
import webgl from "./branch/webgl";
// import pmaoUI from "./branch/pmaoui";
// import pmaoUIhome from "./branch/pmao-ui";
import game from "./branch/game";
import map from "./branch/map";

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/frontPage/frontPage.vue"
      ),
    name: "frontPage",
    meta: { hidden: false, title: "首屏" },
  },
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/home.vue"),
    name: "dashboard",
    redirect: "/map",
    // leaf: true,//只有一个节点
    children: [
        //   ...webgpu,
        //   ...webgl,
      //   ...pmaoUI,
      //   ...game,
      ...map,
      // ...three,
    ],
    meta: { hidden: false, title: "首页" },
  },

  //   ...pmaoUIhome,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
