const map = [
    {
        path: '/map',
        component: () => import('@/pages/map/index.vue'),
        name: 'map',
        redirect: '/map/gaodeMap',
        children: [
            {
                path: '/map/gaodeMap',
                component: () => import('@/pages/map/gaodeMap/index.vue'),
            },
            {
                path: '/map/visualLargeScreen',
                component: () => import('@/pages/map/visualLargeScreen/index.vue'),
            },
        ],
        meta: { hidden: false, title: 'map' },
    },
];

export default map;
