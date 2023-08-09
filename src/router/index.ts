import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/index.vue'),
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/home/index.vue'),
		children: [
			{
				path: '/home/mainWindow/:id?',
				name: 'mainWindow',
				component: () => import('../components/home/mainWindow/mainWindow.vue'),
			},
			{
				path: '/home/recentlyVisited',
				name: 'recentlyVisited',
				component: () => import('../components/home/RecentlyVisited/index.vue'),
			},
		],
	},
	{
		path: '/personalCenter/:id',
		name: 'personalCenter',
		component: () => import('../views/personalCenter/index.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
