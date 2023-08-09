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
	},
	{
		path: '/personalCenter/:id',
		name: 'personalCenter',
		component: () => import('../views/personalCenter/index.vue'),
	},
	{
		path: '/interface',
		name: 'interface',
		component: () => import('../views/interfaceDoc/index.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
