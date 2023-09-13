import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';

const myAxios = (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
	const service = axios.create({
		// baseURL: 'http://127.0.0.1:3000', // 本地服务器环境(ApiPlayer-Backend)
		baseURL: 'https://www.nonhana.site:3000', // 正式环境(AWS-EC2-Server)
		// baseURL: 'https://mock.apifox.cn/m1/3099285-0-default', // apifox云端mock环境
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
