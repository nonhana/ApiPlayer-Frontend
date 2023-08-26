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
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('@/views/main/index.vue'),
		children: [
			{
				path: '/team/:team_id',
				name: 'team',
				component: () => import('@/views/team/index.vue'),
			},
			{
				path: '/recentVisit',
				name: 'recentVisit',
				component: () => import('@/views/recentVisit/index.vue'),
			},
		],
	},
	{
		path: '/personalCenter/:user_id',
		name: 'personalCenter',
		component: () => import('@/views/personalCenter/index.vue'),
	},
	{
		path: '/project/:project_id',
		name: 'project',
		component: () => import('@/views/project/index.vue'),
		// 重定向，为了让路由匹配到projectMain
		redirect(to) {
			return {
				name: 'projectMain',
				params: {
					project_id: to.params.project_id,
				},
			};
		},
		children: [
			{
				path: '/projectMain/:project_id',
				name: 'projectMain',
				component: () => import('@/components/project/ProjectDetails.vue'),
			},
			{
				path: '/projectSettings/:project_id',
				name: 'projectSettings',
				component: () => import('@/components/project/ProjectSettings.vue'),
			},
		],
	},
	{
		path: '/404',
		component: () => import('@/views/404/index.vue'),
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
router.beforeEach((to, _, next) => {
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
