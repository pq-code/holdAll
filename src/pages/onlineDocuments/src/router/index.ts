import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/home/home.vue"),
    name: "home",
    redirect: "/dashboard",
    meta: { hidden: false, title: "首屏" },
  },
  {
    path: "/dashboard",
    component: () => import("@/views/home/home.vue"),
    name: "dashboard",
    redirect: "/onlineDocuments/drawingBoard",
    children: [
      {
        name: "onlineDocuments.drafting",
        path: "/onlineDocuments/drafting",
        component: () => import("@/pages/onlineDocuments/drafting.vue"),
      },
      {
        name: "onlineDocuments.drawingBoard",
        path: "/onlineDocuments/drawingBoard",
        component: () => import("@/pages/drawingBoard/drawingBoard.vue"),
      },
    ],
    meta: { hidden: false, title: "onlineDocuments" },
  },
  {
    path: "/drawingBoard",
    component: () => import("@/pages/drawingBoard/drawingBoard.vue"),
    name: "drawingBoard",
    // leaf: true,//只有一个节点
    meta: { hidden: false, title: "drawingBoard" },
  },
  {
    path: "/onlineDocuments",
    component: () => import("@/pages/onlineDocuments/drafting.vue"),
    name: "onlineDocuments",
    // leaf: true,//只有一个节点
    meta: { hidden: false, title: "onlineDocuments" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
