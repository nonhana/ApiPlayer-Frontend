import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const myAxios = (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
	const service = axios.create({
		baseURL: 'http://127.0.0.1:3000', // 本地服务器环境(api-server)
		// baseURL: 'https://mock.apifox.cn/m1/3099285-0-default', // apifox云端mock环境
		timeout: 10000, // 10秒内无响应则报错
		// 配置请求头token
		headers: {
			Authorization: localStorage.getItem('token') ?? '',
		},
	});
	return service(axiosConfig);
};

export default myAxios;
