import { createRouter, createWebHistory } from 'vue-router';

import onlineDocuments from './branch/onlineDocuments';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/onlineDocuments/drafting.vue'),
    name: 'home',
    meta: { hidden: false, title: '首屏' },
  },
   {
        path: '/onlineDocuments',
        component: () => import('@/pages/onlineDocuments/drafting.vue'),
        name: 'onlineDocuments',
        redirect: '/onlineDocuments/drafting',
        children: [
            {
                path: '/onlineDocuments/drafting',
                component: () => import('@/pages/onlineDocuments/drafting.vue'),
            },
        ],
        meta: { hidden: false, title: 'map' },
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
