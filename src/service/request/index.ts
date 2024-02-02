// 参考：https://github.com/ywanzhou/vue3-template/blob/master/src/service/request/index.ts
import axios from 'axios';
import { ElNotification } from 'element-plus';
import type { AxiosInstance } from 'axios';
import type { RequestConfig, RequestInterceptors, CreateRequestConfig } from './types';

class Request {
	instance: AxiosInstance; // axios实例

	constructor(config: CreateRequestConfig) {
		this.instance = axios.create(config); // 传入配置，创建axios实例

		// 全局请求拦截器
		this.instance.interceptors.request.use(
			(config) => {
				// 配置请求头token
				config.headers.Authorization = localStorage.getItem('token') ?? '';
				return config;
			},
			(err) => Promise.reject(err)
		);

		// 全局响应拦截器
		this.instance.interceptors.response.use(
			(response) => {
				if (response.data.result_code === 1) {
					ElNotification({
						title: 'Error',
						message: response.data.result_msg,
						type: 'error',
					});
					return response.data;
				} else {
					return response.data;
				}
			},
			(err) => {
				// 如果响应超时，报错
				if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
					ElNotification({
						title: 'Timeout',
						message: 'Timeout, please try again later',
						type: 'error',
					});
					return err;
				} else {
					const { status, data } = err.response;
					if (status === 500) {
						ElNotification({
							title: 'Server Error',
							message: data.result_msg || 'An unknown error occurred',
							type: 'error',
						});
					} else if (status === 404) {
						window.location.href = '/404';
					} else if (status === 401) {
						ElNotification({
							title: 'Unauthorized',
							message: 'Please login again',
							type: 'error',
						});
						window.location.href = '/login';
					} else if (status === 400) {
						ElNotification({
							title: 'Parameter Error',
							message: data.result_msg || 'An unknown error occurred',
							type: 'error',
						});
					}
					return err;
				}
			}
		);
	}
	// 请求方法
	request<T>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default Request;
export type { RequestConfig, RequestInterceptors };
