const webgl = [
    {
        path: '/dashboard/webgl',
        component: () => import(/* webpackChunkName: "about" */ '../../pages/webgl/index.vue'),
        name: 'dashboard.webgl',
        redirect: '/webgl/trajectoryMotion',
        // leaf: true,//只有一个节点
        children: [
            {
                path: '/webgl/panoramiciewing',
                component: () => import('@/pages/webgl/panoramiciewing/index.vue'),
                name: 'webgl.panoramiciewing',
            },
            {
                path: '/webgl/trajectoryMotion',
                component: () => import('@/pages/webgl/trajectoryMotion/index.vue'),
                name: 'webgl.trajectoryMotion',
            },
            {
                path: '/webgl/heartOfSteel',
                component: () => import('@/pages/webgl/heartOfSteel/index.vue'),
                name: 'webgl.heartOfSteel',
            },
            {
                path: '/webgl/forzaHorizonScenes',
                component: () => import('@/pages/webgl/forzaHorizonScenes/index.vue'),
                name: 'webgl.forzaHorizonScenes',
            },
            {
                path: '/webgl/visualLargeScreen',
                component: () => import('@/pages/webgl/visualLargeScreen/index.vue'),
                name: 'webgl.forzaHorizonScenes',
            },
        ],
        meta: { hidden: false, title: 'webgl' },
    },
];
export default webgl;
