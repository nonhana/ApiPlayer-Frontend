<template>
	<div v-loading="logining" class="LoginWindow-wrapper">
		<div v-if="loginType === 0" class="content">
			<span class="title">登录</span>
			<el-form :model="userLoginForm" :rules="loginRules">
				<el-row type="flex" justify="space-between" class="form-box">
					<span>邮箱</span>
					<el-form-item prop="email">
						<el-input v-model="userLoginForm.email" placeholder="请输入邮箱" style="width: 250px" @keydown="keyEnterLogin" />
					</el-form-item>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>密码</span>
					<el-form-item prop="password">
						<el-input v-model="userLoginForm.password" placeholder="请输入密码" type="password" style="width: 250px" @keydown="keyEnterLogin" />
					</el-form-item>
				</el-row>
			</el-form>
			<el-row type="flex" justify="center">
				<div class="button" @click="loginType = 1">
					<span>注册</span>
				</div>
				<div class="button" @click="myLogin">
					<span>登录</span>
				</div>
			</el-row>
		</div>

		<div v-if="loginType === 1" class="content">
			<span class="title">注册</span>
			<el-form :model="userRegisterForm" :rules="registerRules">
				<el-row type="flex" justify="space-between" class="form-box">
					<span>邮箱</span>
					<el-form-item prop="email">
						<el-input v-model="userRegisterForm.email" placeholder="请输入邮箱" style="width: 250px" />
					</el-form-item>
				</el-row>
				<el-row type="flex" justify="space-between" class="form-box">
					<span>验证码</span>
					<div style="width: 250px; display: flex; justify-content: space-between">
						<el-form-item prop="verify_code">
							<el-input v-model="userRegisterForm.verify_code" placeholder="请输入验证码" style="width: 140px" />
						</el-form-item>
						<el-button color="#59A8B9" style="height: 40px" :disabled="verifyCodeStatus" @click="sendVerifyCode"
							><span v-if="!verifyCodeStatus" class="button-text">发送验证码</span>
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
import { useStore } from '@/store';
import { login, register, sendCaptcha, getUserInfo } from '@/api/users';
import type { UserInfo } from '@/utils/types';
import { validateEmail } from '@/utils/validate.ts';
import type { FormRules } from 'element-plus';
import { ElNotification } from 'element-plus';

// 可以使用邮箱+密码登录，也可以使用电话号码+验证码登录
interface LoginRuleForm {
	email?: string;
	password?: string;
	verify_code?: string;
}
// 使用邮箱进行注册
interface RegisterRuleForm {
	email: string;
	verify_code: string;
	password: string;
	password_again: string;
}

const { baseStore } = useStore();
const router = useRouter();

const logining = ref<boolean>(false);
// el-form自定义表单验证规则：确认密码是否一致
const checkPassword = (_: any, value: any, callback: any) => {
	if (value.trim().length === 0) {
		callback(new Error('确认密码不能为空'));
	} else if (value !== userRegisterForm.value.password) {
		callback(new Error('两次密码不一致'));
	} else {
		callback();
	}
};
// el-form表单验证规则：登录
const loginRules = reactive<FormRules<LoginRuleForm>>({
	email: [{ required: true, message: '使用邮箱登录时，请输入完整的邮箱', trigger: 'blur' }],
	password: [{ required: true, message: '使用邮箱登录时，请输入密码', trigger: 'blur' }],
	verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});
// el-form表单验证规则：注册
const registerRules = reactive<FormRules<RegisterRuleForm>>({
	email: [{ required: true, message: '请填写正确的邮箱地址', trigger: 'blur' }],
	verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
	password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
	password_again: [{ validator: checkPassword, trigger: 'blur' }],
});

// 登录表单
const userLoginForm = ref({
	email: '',
	password: '',
	verify_code: '',
});
// 注册表单
const userRegisterForm = ref({
	email: '',
	verify_code: '',
	password: '',
	password_again: '',
});
const loginType = ref<number>(0);
const verifyCodeStatus = ref<boolean>(false);
const verifyCodeTimer = ref<number>(60);

let timer: number;

const sendVerifyCode = async () => {
	await sendCaptcha({ email: userRegisterForm.value.email });
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
const myLogin = async () => {
	if (validateEmail(userLoginForm.value.email) === false || userLoginForm.value.password === '') {
		ElNotification({
			title: '登录失败',
			message: '邮箱或密码不正确',
			type: 'error',
		});
	} else {
		logining.value = true;
		const res = await login({ email: userLoginForm.value.email, password: userLoginForm.value.password });
		if (res.data.result_code === 0) {
			localStorage.setItem('token', res.data.result.token);
			const userInfoSource = (await getUserInfo({})).data.result.userInfo;
			const userInfo = {
				user_id: userInfoSource.user_id ?? 1,
				user_name: userInfoSource.username,
				user_img: userInfoSource.avatar,
				user_email: userInfoSource.email,
				user_sign: userInfoSource.introduce,
			} as UserInfo;
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			baseStore.setUserInfo(userInfo);
			router.push({ name: 'main' });
			ElNotification({
				title: '登录成功',
				message: '欢迎回来！',
				type: 'success',
			});
		}
		logining.value = false;
	}
};
const myRegister = async () => {
	if (
		userRegisterForm.value.email === '' ||
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
			user_phone: userRegisterForm.value.email,
			user_sign: 'A passionate developer and lifelong learner.',
		};
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		baseStore.setUserInfo(userInfo);

		const res = await register({
			email: userRegisterForm.value.email,
			captcha: userRegisterForm.value.verify_code,
			password: userRegisterForm.value.password,
		});

		if (res.data.result_code === 0) {
			loginType.value = 0;
			ElNotification({
				title: '注册成功',
				message: '请登录！',
				type: 'success',
			});
		}
	}
};
// 当按下回车键时，触发登录
const keyEnterLogin = (key: KeyboardEvent | Event) => {
	if (key instanceof KeyboardEvent && key.key === 'Enter') {
		myLogin();
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
			verify_code: '',
		};
	} else {
		userRegisterForm.value = {
			email: '',
			verify_code: '',
			password: '',
			password_again: '',
		};
	}
});
</script>

<style scoped lang="less">
.LoginWindow-wrapper {
	position: relative;
	width: 400px;
	padding: 40px 0 100px;
	border-radius: 50px;
	background: #fff;
	overflow: hidden;
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
			font-family: Microsoft YaHei;
			font-size: 18px;
			font-weight: normal;
			color: #3d3d3d;
			.button-text {
				font-family: Microsoft YaHei;
				font-size: 14px;
				font-weight: normal;
				color: #fff;
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
				&:hover {
					color: #59a8b9;
				}
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
			font-family: Source Han Sans CN;
			font-size: 16px;
			font-weight: normal;
			color: #fff;
			&:hover {
				box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
			}
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
@/utils/types/types
