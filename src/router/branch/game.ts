const game = [
    {
        path: '/game',
        component: () => import('@/pages/game/index.vue'),
        name: 'game',
        redirect: '/game/sl',
        children: [
            {
                path: '/game/sl',
                name: 'game.sl',
                component: () => import('@/pages/game/sl/index.vue'),
            },
            {
                path: '/game/multiplayerOnline',
                name: 'game.multiplayerOnline',
                component: () => import('@/pages/game/multiplayerOnline/index.vue'),
            },
            {
                path: '/game/drawingBoard',
                name: 'game.drawingBoard',
                component: () => import('@/pages/game/drawingBoard/index.vue'),
            },
        ],
        meta: { hidden: false, title: 'game' },
    },
];

export default game;
