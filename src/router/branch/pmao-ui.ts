const pmaoUIhome = [
    {
        path: '/pmaoUI/home',
        component: () =>
            import(/* webpackChunkName: "about" */ '../../pages/pmaoUI/pmao-ui/index.vue'),
        name: 'pmaoUI',
        // leaf: true,//只有一个节点
        children: [
            {
                path: '/home',
                component: () =>
                    import(/* webpackChunkName: "about" */ '../../pages/pmaoUI/pmao-ui/index.vue'),
            },
        ],
        meta: { hidden: false, title: 'UI' },
    },
];

export default pmaoUIhome;
