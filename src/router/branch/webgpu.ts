const webgpu = [
    {
        path: '/webgpu',
        component: () => import(/* webpackChunkName: "about" */ '../../pages/webgpu/index.vue'),
        name: 'webgpu',
        children: [
            {
                path: '/webgpu',
                component: () =>
                    import(/* webpackChunkName: "about" */ '../../pages/webgpu/index.vue'),
            },
        ],
        meta: { hidden: false, title: 'webgpu' },
    },
];
export default webgpu;
