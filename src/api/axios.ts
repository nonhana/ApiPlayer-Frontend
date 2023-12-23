import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';

const myAxios = (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
	const service = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL as string, // 从环境变量文件中获取baseURL
		timeout: 10000, // 10秒内无响应则报错
	});
	// 请求拦截器
	service.interceptors.request.use(
		(config) => {
			// 配置请求头token
			config.headers.Authorization = localStorage.getItem('token') ?? '';
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	// 响应拦截器
	service.interceptors.response.use(
		(response) => {
			const res = response.data;
			if (res.result_code === 1) {
				ElNotification({
					title: '错误',
					message: res.result_msg,
					type: 'error',
				});
				return response;
			} else {
				return response;
			}
		},
		(error) => {
			// 如果响应超时，报错
			if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				ElNotification({
					title: '请求超时',
					message: '请求超时，请检查网络',
					type: 'error',
				});
				return Promise.reject(error);
			} else {
				const { status, data } = error.response;
				if (status === 500) {
					ElNotification({
						title: '服务器错误',
						message: data.result_msg || '未知错误',
						type: 'error',
					});
				} else if (status === 401) {
					ElNotification({
						title: '登录过期',
						message: data.result_msg || '未知错误',
						type: 'error',
					});
					setTimeout(() => {
						location.href = '/login';
					}, 2000);
				} else if (status === 400) {
					ElNotification({
						title: '参数错误',
						message: data.result_msg || '未知错误',
						type: 'error',
					});
				}
				return Promise.reject(data.result_msg || 'Error');
			}
		}
	);
	return service(axiosConfig);
};

export default myAxios;
