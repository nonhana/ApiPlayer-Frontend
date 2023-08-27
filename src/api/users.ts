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
		method: 'POST',
		data: paramsList,
	});
};

export const sendCaptcha = (paramsList: { email: string }) => {
	return myAxios({
		url: '/users/send-captcha',
		method: 'POST',
		data: paramsList,
	});
};

export const getUserInfo = (paramsList: { user_id?: number }) => {
	return myAxios({
		url: '/users/info',
		method: 'GET',
		params: paramsList,
	});
};

export const updateUserInfo = (paramsList: { email?: string; introduce?: string; username?: string }) => {
	return myAxios({
		url: '/users/update-info',
		method: 'POST',
		data: paramsList,
	});
};

export const uploadAvatar = (paramsList: { avatar: File }) => {
	return myAxios({
		url: '/users/upload-avatar',
		method: 'POST',
		data: paramsList,
		headers: {
			Authorization: localStorage.getItem('token') ?? '',
			'Content-Type': 'multipart/form-data',
		},
	});
};

//搜索用户
export const searchUser = (paramsList: { username: string }) => {
	return myAxios({
		url: '/users/searchuser',
		method: 'GET',
		params: paramsList,
	});
};

// 修改邮箱
export const changEmail = (paramsList: { newEmail: string; captcha: string }) => {
	return myAxios({
		url: '/users/change-email',
		method: 'POST',
		data: paramsList,
	});
};

// 修改密码
export const changPassword = (paramsList: { newPassword: string; captcha: string }) => {
	return myAxios({
		url: '/users/change-password',
		method: 'POST',
		data: paramsList,
	});
};

// 修改密码时发送邮件
export const sendCaptchaChangPassword = () => {
	return myAxios({
		url: '/users/send-captcha-when-change-password',
		method: 'POST',
		// data: paramsList,
	});
};
