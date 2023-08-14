import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElNotification } from 'element-plus';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/main',
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
		path: '/main',
		name: 'main',
		component: () => import('../views/main/index.vue'),
		redirect: '/team',
		children: [
			{
				path: '/team',
				name: 'team',
				component: () => import('../views/team/index.vue'),
			},
			{
				path: '/recentVisit',
				name: 'recentVisit',
				component: () => import('../views/recentVisit/index.vue'),
			},
		],
	},
	{
		path: '/personalCenter/:user_id',
		name: 'personalCenter',
		component: () => import('../views/personalCenter/index.vue'),
	},
	{
		path: '/interface/:api_id',
		name: 'interface',
		component: () => import('../views/interfaceDoc/index.vue'),
	},
	{
		path: '/404',
		component: () => import('../views/404/index.vue'),
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// 路由守卫:未登录则不能访问其他页面
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token'); //获取token
	if (token || to.path === '/login') {
		//有token或者在login页面下通行
		next();
	} else {
		ElNotification({
			title: '未登录',
			message: '请先登录',
			type: 'error',
			duration: 3000,
		});
		next('/login');
	}
});

export default router;
