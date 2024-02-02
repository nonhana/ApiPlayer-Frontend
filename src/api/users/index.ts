import request from '@/service';
import {
	LoginReq,
	ModifyEmailReq,
	ModifyPasswordReq,
	ModifyUserInfoReq,
	RegisterReq,
	SearchUserReq,
	SendCaptchaReq,
	UploadAvatarReq,
	UserInfo,
} from './types';
import { UserIdOpt } from '../types';

// 用户注册
export const register = (data: RegisterReq) => {
	return request<RegisterReq, undefined>({
		url: '/users/register',
		method: 'POST',
		data,
	});
};

// 用户登录
export const login = (data: LoginReq) => {
	return request<LoginReq, string>({
		url: '/users/login',
		method: 'POST',
		data,
	});
};

// 发送邮箱验证码
export const sendCaptcha = (data: SendCaptchaReq) => {
	return request<SendCaptchaReq, undefined>({
		url: '/users/send-captcha',
		method: 'POST',
		data,
	});
};

// 获取用户信息
export const getUserInfo = (params: UserIdOpt) => {
	return request<UserIdOpt, UserInfo>({
		url: '/users/info',
		method: 'GET',
		params,
	});
};

// 修改用户信息
export const updateUserInfo = (data: ModifyUserInfoReq) => {
	return request<ModifyUserInfoReq, undefined>({
		url: '/users/update-info',
		method: 'POST',
		data,
	});
};

// 上传头像
export const uploadAvatar = (data: UploadAvatarReq) => {
	return request<UploadAvatarReq, string>({
		url: '/users/upload-avatar',
		method: 'POST',
		data,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

//搜索用户
export const searchUser = (params: SearchUserReq) => {
	return request<SearchUserReq, UserInfo[]>({
		url: '/users/searchuser',
		method: 'GET',
		params,
	});
};

// 修改邮箱
export const changEmail = (data: ModifyEmailReq) => {
	return request<ModifyEmailReq, undefined>({
		url: '/users/change-email',
		method: 'POST',
		data,
	});
};

// 修改密码
export const changPassword = (data: ModifyPasswordReq) => {
	return request<ModifyPasswordReq, undefined>({
		url: '/users/change-password',
		method: 'POST',
		data,
	});
};

// 修改密码时发送邮件
export const sendCaptchaChangPassword = () => {
	return request<undefined, undefined>({
		url: '/users/send-captcha-when-change-password',
		method: 'POST',
	});
};
