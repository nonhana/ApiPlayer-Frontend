import myAxios from './axios';

// 如果是GET请求，参数就是params；如果是POST请求，参数就是data
// 如果paramsList的类型过于复杂，可以将其提取出，定义为一个接口使用

// 用户注册
export const register = (paramsList: { captcha: string; email: string; password: string }) => {
	return myAxios({
		url: '/users/register',
		method: 'POST',
		data: paramsList,
	});
};

// 用户登录
export const login = (paramsList: { email: string; password: string }) => {
	return myAxios({
		url: '/users/login',
		method: 'GET',
		params: paramsList,
	});
};
