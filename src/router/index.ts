import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

import webgpu from "./branch/webgpu";
import webgl from "./branch/webgl";
// import pmaoUI from "./branch/pmaoui";
// import pmaoUIhome from "./branch/pmao-ui";
import game from "./branch/game";
import map from "./branch/map";
import firstScreenFn from "./firstScreenFn"

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
   {
        path: "/firstScreen/home",
        component: () => import(/* webpackChunkName: "about" */ "../views/frontPage/frontPage.vue"),
        name: "firstScreen",
        // leaf: true,//只有一个节点
        meta: { hidden: false, title: "firstScreen" },
    },
    {
        path: "/firstScreen/square",
        component: () => import(/* webpackChunkName: "about" */ "../views/frontPage/frontPage.vue"),
        name: "firstScreen",
        // leaf: true,//只有一个节点
        meta: { hidden: false, title: "firstScreen" },
    },

  //   ...pmaoUIhome,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
    // 随机首页
    firstScreenFn(to, from, next)
});
export default router;
