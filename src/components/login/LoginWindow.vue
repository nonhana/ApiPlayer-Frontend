<template>
	<div class="LoginWindow-wrap">
		<div v-if="loginType === 0" class="content">
			<span class="title">登录</span>
			<el-form :model="userLoginForm" :rules="loginRules">
				<el-row type="flex" justify="space-between" class="form-box">
					<span>邮箱</span>
					<el-form-item prop="email">
						<el-input v-model="userLoginForm.email" placeholder="请输入邮箱" style="width: 250px" />
					</el-form-item>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>密码</span>
					<el-form-item prop="password">
						<el-input v-model="userLoginForm.password" placeholder="请输入密码" type="password" style="width: 250px" />
					</el-form-item>
				</el-row>
			</el-form>
			<span class="tip">点击切换<span @click="loginType = 1">手机号登录</span></span>
			<el-row type="flex" justify="center">
				<div class="button" @click="loginType = 2">
					<span>注册</span>
				</div>
				<div class="button" @click="myLogin(0)">
					<span>登录</span>
				</div>
			</el-row>
		</div>
		<div v-if="loginType === 1" class="content">
			<span class="title">登录</span>
			<el-form :model="userLoginForm" :rules="loginRules">
				<el-row type="flex" justify="space-between" class="form-box">
					<span>手机号</span>
					<el-form-item prop="phone_number">
						<el-input v-model="userLoginForm.phone_number" placeholder="请输入手机号" style="width: 250px" />
					</el-form-item>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>验证码</span>
					<div style="width: 250px; display: flex; justify-content: space-between">
						<el-form-item prop="verify_code">
							<el-input v-model="userLoginForm.verify_code" placeholder="请输入验证码" style="width: 140px" />
						</el-form-item>
						<el-button style="height: 40px" color="#59A8B9" :disabled="verifyCodeStatus" @click="sendVerifyCode"
							><span v-if="!verifyCodeStatus" class="button-text">发送验证码</span>
							<span v-else class="button-text">
								已发送
								{{ verifyCodeTimer + 's' }}
							</span></el-button
						>
					</div>
				</el-row>
			</el-form>

			<span class="tip">点击切换<span @click="loginType = 0">邮箱登录</span></span>
			<el-row type="flex" justify="center">
				<div class="button">
					<span @click="loginType = 2">注册</span>
				</div>
				<div class="button" @click="myLogin(1)">
					<span>登录</span>
				</div>
			</el-row>
		</div>
		<div v-if="loginType === 2" class="content">
			<span class="title">注册</span>
			<el-form :model="userRegisterForm" :rules="registerRules">
				<el-row type="flex" justify="space-between" class="form-box">
					<span>邮箱</span>
					<el-form-item prop="phone_number">
						<el-input v-model="userRegisterForm.phone_number" placeholder="请输入邮箱" style="width: 250px" />
					</el-form-item>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>验证码</span>
					<div style="width: 250px; display: flex; justify-content: space-between">
						<el-form-item prop="verify_code">
							<el-input v-model="userRegisterForm.verify_code" placeholder="请输入验证码" style="width: 140px" />
						</el-form-item>
						<el-button color="#59A8B9" style="height: 40px" :disabled="verifyCodeStatus" @click="sendVerifyCode"
							><span v-if="!verifyCodeStatus" class="button-text" @click="mySendCaptcha">发送验证码</span>
							<span v-else class="button-text">
								已发送
								{{ verifyCodeTimer + 's' }}
							</span></el-button
						>
					</div>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>密码</span>
					<el-form-item prop="password">
						<el-input v-model="userRegisterForm.password" placeholder="请输入密码" type="password" style="width: 250px" />
					</el-form-item>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>确认密码</span>
					<el-form-item prop="password_again">
						<el-input v-model="userRegisterForm.password_again" placeholder="请再输入一遍密码" type="password" style="width: 250px" />
					</el-form-item>
				</el-row>
			</el-form>
			<el-row type="flex" justify="center">
				<div class="button" @click="myRegister">
					<span>注册</span>
				</div>
				<div class="button">
					<span @click="loginType = 0">返回登录</span>
				</div>
			</el-row>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useBaseStore } from '@/store/index';
import type { UserInfo } from '@/utils/types';
import type { FormRules } from 'element-plus';
import { ElNotification } from 'element-plus';

import { login, register, sendCaptcha, getUserInfo } from '@/api/users.ts';
import { validateEmail } from '@/utils/validate.ts';

// 可以使用邮箱+密码登录，也可以使用电话号码+验证码登录
interface LoginRuleForm {
	email?: string;
	password?: string;
	phone_number?: string;
	verify_code?: string;
}
interface RegisterRuleForm {
	password: string;
	password_again: string;
	phone_number: string;
	verify_code: string;
}

const store = useBaseStore();
// el-form自定义表单验证规则：确认密码是否一致
const checkPassword = (_: any, value: any, callback: any) => {
	if (value.trim().length == 0) {
		callback(new Error('确认密码不能为空'));
	} else if (value != userRegisterForm.value.password) {
		callback(new Error('两次密码不一致'));
	} else {
		callback();
	}
};
// el-form表单验证规则：登录
const loginRules = reactive<FormRules<LoginRuleForm>>({
	email: [{ required: true, message: '使用邮箱登录时，请输入完整的邮箱', trigger: 'blur' }],
	password: [{ required: true, message: '使用邮箱登录时，请输入密码', trigger: 'blur' }],
	phone_number: [{ required: true, message: '使用手机号登录时，请输入完整的手机号', trigger: 'blur' }],
	verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});
// el-form表单验证规则：注册
const registerRules = reactive<FormRules<RegisterRuleForm>>({
	phone_number: [{ required: true, message: '请填写完整的手机号', trigger: 'blur' }],
	verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
	password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
	password_again: [{ validator: checkPassword, trigger: 'blur' }],
});
const router = useRouter();

// 登录表单
let userLoginForm = ref({
	email: '',
	password: '',
	phone_number: '',
	verify_code: '',
});
// 注册表单
let userRegisterForm = ref({
	password: '',
	password_again: '',
	phone_number: '',
	verify_code: '',
});
let loginType = ref<number>(0);
let verifyCodeStatus = ref<boolean>(false);
let verifyCodeTimer = ref<number>(60);
let timer: any = null;

const sendVerifyCode = () => {
	verifyCodeStatus.value = true;
	timer = setInterval(() => {
		verifyCodeTimer.value--;
		if (verifyCodeTimer.value === 0) {
			clearInterval(timer);
			verifyCodeStatus.value = false;
			verifyCodeTimer.value = 60;
		}
	}, 1000);
};
const mySendCaptcha = () => {
	sendCaptcha({ email: userRegisterForm.value.phone_number }).then(
		() => {},
		() => {}
	);
};
const myLogin = (type: number) => {
	if (type === 0) {
		if (validateEmail(userLoginForm.value.email) == false || userLoginForm.value.password === '') {
			ElNotification({
				title: '登录失败',
				message: '邮箱或密码不正确',
				type: 'error',
			});
		} else {
			login({ email: userLoginForm.value.email, password: userLoginForm.value.password }).then(
				async (res) => {
					if (res.data) {
						localStorage.setItem('token', res.data.result.token);
						const userInfoSource = (await getUserInfo()).data.result.userInfo;
						// console.log('userInfoSource', userInfoSource);
						const userInfo = {
							user_id: userInfoSource.user_id ?? 1,
							user_name: userInfoSource.username,
							user_img: userInfoSource.avatar,
							user_email: userInfoSource.email,
							user_sign: userInfoSource.introduce,
						} as UserInfo;

						localStorage.setItem('userInfo', JSON.stringify(userInfo));
						// console.log('id:', userInfo.user_id);
						store.setUserInfo(userInfo);
						console.log(store.user_info);

						// router.push({ name: 'home' });
						router.push({ name: 'main' });
						ElNotification({
							title: '登录成功',
							message: '欢迎回来！',
							type: 'success',
						});
					}
				},
				() => {
					ElNotification({
						title: '登录失败',
						message: '请求服务器失败1',
						type: 'error',
					});
				}
			);
		}
	} else {
		if (userLoginForm.value.phone_number === '' || userLoginForm.value.verify_code === '') {
			ElNotification({
				title: '登录失败',
				message: '电话号码或验证码不完整',
				type: 'error',
			});
		} else {
			const userInfo: UserInfo = {
				user_id: 0,
				user_name: '',
				user_img: 'https://dummyimage.com/400X400',
				user_email: '',
				user_phone: userLoginForm.value.phone_number,
				user_sign: 'A passionate developer and lifelong learner.',
			};
			localStorage.setItem('userInfo', JSON.stringify(userInfo));

			store.setUserInfo(userInfo);

			login({ email: userLoginForm.value.phone_number, password: userLoginForm.value.verify_code }).then(
				(res) => {
					if (res.data) {
						console.log(res.data);
						localStorage.setItem('token', res.data.result.token);
						// router.push({ name: 'home' });
						router.push({ name: 'main' });
						ElNotification({
							title: '登录成功',
							message: '欢迎回来！',
							type: 'success',
						});
					}
				},
				() => {
					ElNotification({
						title: '登录失败',
						message: '请求服务器失败',
						type: 'error',
					});
				}
			);

			// // router.push({ name: 'home' });
			// router.push({ name: 'main' });
			// ElNotification({
			// 	title: '登录成功',
			// 	message: '欢迎回来！',
			// 	type: 'success',
			// });
		}
	}
};

const myRegister = () => {
	if (
		userRegisterForm.value.phone_number === '' ||
		userRegisterForm.value.password === '' ||
		userRegisterForm.value.password !== userRegisterForm.value.password_again
	) {
		ElNotification({
			title: '登录失败',
			message: '邮箱或密码不完整',
			type: 'error',
		});
	} else if (userRegisterForm.value.verify_code === '') {
		ElNotification({
			title: '登录失败',
			message: '验证码错误',
			type: 'error',
		});
	} else {
		const userInfo: UserInfo = {
			user_id: 0,
			user_name: '',
			user_img: 'https://dummyimage.com/400X400',
			user_email: '',
			user_phone: userRegisterForm.value.phone_number,
			user_sign: 'A passionate developer and lifelong learner.',
		};
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		store.setUserInfo(userInfo);

		register({
			email: userRegisterForm.value.phone_number,
			captcha: userRegisterForm.value.verify_code,
			password: userRegisterForm.value.password,
		}).then(
			(res) => {
				if (res.data) {
					loginType.value = 0;
					ElNotification({
						title: '注册成功',
						message: '请登录！',
						type: 'success',
					});
				}
			},
			() => {
				ElNotification({
					title: '注册失败',
					message: '请求服务器失败',
					type: 'error',
				});
			}
		);
	}
};

watch(loginType, (newV, _) => {
	// 恢复计时器
	clearInterval(timer);
	verifyCodeStatus.value = false;
	verifyCodeTimer.value = 60;
	// 切换登录方式时，清空表单数据
	if (newV === 0) {
		userLoginForm.value = {
			email: '',
			password: '',
			phone_number: '',
			verify_code: '',
		};
	} else if (newV === 1) {
		userLoginForm.value = {
			email: '',
			password: '',
			phone_number: '',
			verify_code: '',
		};
	} else {
		userRegisterForm.value = {
			password: '',
			password_again: '',
			phone_number: '',
			verify_code: '',
		};
	}
});
</script>

<style scoped lang="less">
.LoginWindow-wrap {
	position: relative;
	width: 400px;
	padding: 40px 0 100px;
	border-radius: 50px;
	background: #ffffff;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			font-family: Microsoft YaHei;
			font-size: 36px;
			font-weight: normal;
			color: #3d3d3d;
		}
		.form-box {
			margin-top: 40px;
			align-items: center;
			width: 330px;
			span {
				font-family: Microsoft YaHei;
				font-size: 18px;
				font-weight: normal;
				color: #3d3d3d;
			}
			.button-text {
				font-family: Microsoft YaHei;
				font-size: 14px;
				font-weight: normal;
				color: #ffffff;
			}
		}
		.tip {
			margin-top: 20px;
			font-family: Source Han Sans CN;
			font-size: 12px;
			font-weight: normal;
			color: #3d3d3d;
			span {
				cursor: pointer;
			}
			span:hover {
				color: #59a8b9;
			}
		}
		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 60px 10px 0;
			width: 135px;
			height: 45px;
			border-radius: 25px;
			background: #59a8b9;
			cursor: pointer;
			transition: all 0.3s ease;
			span {
				font-family: Source Han Sans CN;
				font-size: 16px;
				font-weight: normal;
				color: #ffffff;
			}
		}
		.button:hover {
			box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
		}
	}
}

.el-input {
	height: 40px;
}

.el-form-item {
	margin: 0;
}
</style>
