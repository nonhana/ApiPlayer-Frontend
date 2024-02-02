// src/api/users/types/index.ts
// 用于定义所有与用户相关的请求类型

/* ----------请求体定义---------- */

/**
 * 发送验证码请求体
 */
export interface SendCaptchaReq {
	/**
	 * 邮箱地址
	 */
	email: string;
}
/**
 * 注册请求体
 */
export interface RegisterReq {
	/**
	 * 邮箱地址
	 */
	email: string;
	/**
	 * 邮箱验证码
	 */
	captcha: string;
	/**
	 * 密码
	 */
	password: string;
}
/**
 * 登录请求体
 */
export interface LoginReq {
	/**
	 * 邮箱地址
	 */
	email: string;
	/**
	 * 密码
	 */
	password: string;
}
/**
 * 修改用户信息请求体
 */
export interface ModifyUserInfoReq {
	/**
	 * 用户名
	 */
	username?: string;
	/**
	 * 用户介绍
	 */
	introduce?: string;
	/**
	 * 用户头像
	 */
	avatar?: string;
	/**
	 * 用户邮箱
	 */
	email?: string;
}
/**
 * 搜索用户请求体
 */
export interface SearchUserReq {
	/**
	 * 用户名
	 */
	username: string;
}
/**
 * 修改密码请求体
 */
export interface ModifyPasswordReq {
	/**
	 * 验证码
	 */
	captcha: string;
	/**
	 * 新密码
	 */
	newPassword: string;
}
/**
 * 修改邮箱请求体
 */
export interface ModifyEmailReq {
	/**
	 * 验证码
	 */
	captcha: string;
	/**
	 * 新邮箱地址
	 */
	newEmail: string;
}
/**
 * 上传头像请求体
 */
export interface UploadAvatarReq {
	/**
	 * 头像文件
	 */
	avatar: File;
}

/* ----------响应体定义---------- */

/**
 * 用户个人信息
 */
export interface UserInfo {
	/**
	 * 用户id
	 */
	user_id: number;
	/**
	 * 用户名称
	 */
	username: string;
	/**
	 * 用户邮箱
	 */
	email: string;
	/**
	 * 用户介绍
	 */
	introduce: string;
	/**
	 * 用户头像
	 */
	avatar: string;
}
