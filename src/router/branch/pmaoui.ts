const pmaoUI = [
    {
        path: '/pmaoui',
        component: () => import(/* webpackChunkName: "about" */ '../../pages/pmaoUI/index.vue'),
        name: 'pmaoui',
        // leaf: true,//只有一个节点
        children: [
            {
                path: '/pmaoui',
                component: () =>
                    import(/* webpackChunkName: "about" */ '../../pages/pmaoUI/index.vue'),
            },
        ],
        meta: { hidden: false, title: 'UI' },
    },
];

export default pmaoUI;
