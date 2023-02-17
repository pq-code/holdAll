const map = [
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

export default map;
