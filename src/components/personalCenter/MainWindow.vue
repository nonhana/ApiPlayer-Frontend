<template>
	<div class="MainWindow-wrapper">
		<el-row type="flex" justify="start" style="align-items: center; width: 100%; height: 100px">
			<div class="title">
				<span>头像</span>
			</div>
			<div class="user-head" @mouseenter="showTemplate = true" @mouseleave="showTemplate = false">
				<transition name="fade">
					<div v-if="showTemplate" class="template" @click="uploadFile">
						<span>重新选取头像</span>
					</div>
				</transition>
				<input v-show="false" ref="fileRef" type="file" @change="fileChange" />
				<el-image :src="userInfo!.user_img">
					<template #error>
						<div
							class="image-slot"
							style="
								display: flex;
								justify-content: center;
								align-items: center;
								width: 100px;
								height: 100px;
								background: var(--el-fill-color-light);
								color: var(--el-text-color-secondary);
								font-size: 30px;
							"
						>
							<el-icon><icon-picture /></el-icon>
						</div>
					</template>
				</el-image>
			</div>
		</el-row>
		<el-divider />
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 60px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>名称</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_name }}</span>
				</div>
			</div>
			<div class="button" @click="windowShowList[1] = true">
				<span>编辑</span>
			</div>
		</el-row>
		<el-divider />
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 60px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>密码</span>
				</div>
				<div class="content">
					<span>************</span>
				</div>
			</div>
			<div class="button" @click="windowShowList[2] = true">
				<span>编辑</span>
			</div>
		</el-row>
		<el-divider />
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 60px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>邮箱</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_email }}</span>
				</div>
			</div>
			<div class="button" @click="windowShowList[3] = true">
				<span>修改</span>
			</div>
		</el-row>
		<el-divider />
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 60px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>个人简介</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_sign }}</span>
				</div>
			</div>
			<div class="button" @click="windowShowList[5] = true">
				<span>编辑</span>
			</div>
		</el-row>

		<el-dialog v-model="windowShowList[0]" title="图片裁剪" width="800px" :before-close="handleClose">
			<vue-picture-cropper
				:box-style="{
					width: '100%',
					maxHeight: '500px',
					backgroundColor: '#f8f8f8',
					margin: 'auto',
				}"
				:img="sourceFileURL"
				:options="{
					viewMode: 1,
					dragMode: 'crop',
					aspectRatio: 1 / 1,
					outputType: 'jpeg',
				}"
			/>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="windowShowList[0] = false">取消</el-button>
					<el-button color="#59A8B9" @click="confirmCropper"><span style="color: #fff">确认</span></el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="windowShowList[1]" title="修改名称" width="500px" :before-close="handleClose">
			<div>
				<el-input v-model="userName"></el-input>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="changeAction(0)">取消</el-button>
					<el-button color="#59A8B9" @click="changeAction(1)"><span style="color: #fff">确认</span></el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="windowShowList[2]" title="修改密码" width="500px" :before-close="handleClose">
			<div v-if="pwdChangeInfo.pwd_change_step === 0">
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%">
					<span>邮箱</span>
					<el-input v-model="pwdChangeInfo.phone_number" :placeholder="userInfo.user_email" style="width: 300px" :readonly="true"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="margin-top: 20px; align-items: center; width: 100%">
					<span>验证码</span>
					<div style="width: 250px; height: 32px; display: flex; justify-content: space-between">
						<el-form-item prop="verify_code">
							<el-input v-model="pwdChangeInfo.verify_code" placeholder="请输入验证码" style="width: 140px" />
						</el-form-item>
						<el-button style="height: 32px" color="#59A8B9" :disabled="pwdChangeInfo.verify_code_status" @click="sendVerifyCode(0)"
							><span v-if="!pwdChangeInfo.verify_code_status" class="button-text"><span style="color: #fff">发送验证码</span></span>
							<span v-else class="button-text">
								已发送
								{{ pwdChangeInfo.verify_code_timer + 's' }}
							</span></el-button
						>
					</div>
				</el-row>
			</div>
			<div v-else>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%">
					<span>新的密码</span>
					<el-input v-model="pwdChangeInfo.new_pwd" type="password" placeholder="请输入新的密码" style="width: 300px"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="margin-top: 20px; align-items: center; width: 100%">
					<span>确认密码</span>
					<el-input v-model="pwdChangeInfo.confirm_pwd" type="password" placeholder="请再输入一遍" style="width: 300px"></el-input>
				</el-row>
			</div>
			<template #footer>
				<span v-if="pwdChangeInfo.pwd_change_step === 0" class="dialog-footer">
					<el-button @click="changeAction(0)">取消</el-button>
					<el-button color="#59A8B9" @click="pwdChangeInfo.pwd_change_step = 1"><span style="color: #fff">下一步</span></el-button>
				</span>
				<span v-else class="dialog-footer">
					<el-button @click="pwdChangeInfo.pwd_change_step = 0">上一步</el-button>
					<el-button color="#59A8B9" @click="confirmPwdChange"><span style="color: #fff">确认</span></el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="windowShowList[3]" title="修改邮箱地址" width="500px" :before-close="handleClose">
			<div>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%">
					<span>新的邮箱</span>
					<el-input v-model="emailChangeInfo.email" placeholder="请输入新的邮箱地址" style="width: 300px"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="margin-top: 20px; align-items: center; width: 100%">
					<span>验证码</span>
					<div style="width: 250px; height: 32px; display: flex; justify-content: space-between">
						<el-form-item prop="verify_code">
							<el-input v-model="emailChangeInfo.verify_code" placeholder="请输入验证码" style="width: 140px" />
						</el-form-item>
						<el-button style="height: 32px" color="#59A8B9" :disabled="emailChangeInfo.verify_code_status" @click="sendVerifyCode(1)"
							><span v-if="!emailChangeInfo.verify_code_status" class="button-text"><span style="color: #fff">发送验证码</span></span>
							<span v-else class="button-text">
								已发送
								{{ emailChangeInfo.verify_code_timer + 's' }}
							</span></el-button
						>
					</div>
				</el-row>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="changeAction(0)">取消</el-button>
					<el-button color="#59A8B9" @click="confrimEmailChange"><span style="color: #fff">确定</span></el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="windowShowList[4]" title="修改手机号" width="500px" :before-close="handleClose">
			<div>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%">
					<span>新手机号</span>
					<el-input v-model="phoneNumberChangeInfo.phone_number" placeholder="请输入新的手机号" style="width: 300px"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="margin-top: 20px; align-items: center; width: 100%">
					<span>验证码</span>
					<div style="width: 250px; height: 32px; display: flex; justify-content: space-between">
						<el-form-item prop="verify_code">
							<el-input v-model="phoneNumberChangeInfo.verify_code" placeholder="请输入验证码" style="width: 140px" />
						</el-form-item>
						<el-button style="height: 32px" color="#59A8B9" :disabled="phoneNumberChangeInfo.verify_code_status" @click="sendVerifyCode(2)"
							><span v-if="!phoneNumberChangeInfo.verify_code_status" class="button-text"><span style="color: #fff">发送验证码</span></span>
							<span v-else class="button-text">
								已发送
								{{ phoneNumberChangeInfo.verify_code_timer + 's' }}
							</span></el-button
						>
					</div>
				</el-row>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="changeAction(0)">取消</el-button>
					<el-button color="#59A8B9" @click="confirmPhoneNumberChange"><span style="color: #fff">确定</span></el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="windowShowList[5]" title="修改个性签名" width="500px" :before-close="handleClose">
			<div>
				<el-input v-model="userSign"></el-input>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="changeAction(0)">取消</el-button>
					<el-button color="#59A8B9" @click="changeAction(2)"><span style="color: #fff">确认</span></el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { useStore } from '@/store';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import { getUserInfo, updateUserInfo, uploadAvatar, sendCaptcha, changEmail, changPassword, sendCaptchaChangPassword } from '@/api/users';
import type { UserInfo } from '@/utils/types';
import { validateEmail } from '@/utils/validate.ts';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Picture as IconPicture } from '@element-plus/icons-vue';

const { baseStore } = useStore();

// 获取文件上传的input元素
const fileRef = ref<HTMLInputElement>();

const userInfo = ref<UserInfo>({
	user_id: 0,
	user_name: '',
	user_img: '',
	user_email: '',
	user_phone: '',
	user_sign: '',
});
const userSign = ref<string>();
const userName = ref<string>();
const showTemplate = ref<boolean>(false);
const windowShowList = ref<boolean[]>([false, false, false, false, false, false]);

const croppedFileURL = ref<string>('');
let sourceFile: File | null | undefined = null;
let sourceFileURL: string = '';
let croppedFile: File | null | undefined = null;
let croppedFileType: string = ''; // 裁剪后的文件类型

const pwdChangeInfo = ref({
	pwd_change_step: 0,
	phone_number: '',
	verify_code: '',
	new_pwd: '',
	confirm_pwd: '',
	verify_code_status: false,
	verify_code_timer: 60,
	timer: 0,
});
const emailChangeInfo = ref({
	email: '',
	verify_code: '',
	verify_code_status: false,
	verify_code_timer: 60,
	timer: 0,
});
const phoneNumberChangeInfo = ref({
	phone_number: '',
	verify_code: '',
	verify_code_status: false,
	verify_code_timer: 60,
	timer: 0,
});

// 直接点击el-dialog的叉叉关闭
const handleClose = (done: () => void) => {
	ElMessageBox.confirm('确定放弃修改吗？').then(() => {
		done();
	});
};
// 点击上传文件
const uploadFile = () => {
	fileRef.value?.click();
};
// 监听文件变化
const fileChange = () => {
	sourceFile = fileRef.value?.files?.[0] || null;
	croppedFileType = sourceFile?.type ?? '';
	if (sourceFile !== null) {
		windowShowList.value[0] = true;
		sourceFileURL = URL.createObjectURL(sourceFile as Blob);
	}
};
// 确认裁剪
const confirmCropper = async () => {
	windowShowList.value[0] = false;
	croppedFile = await cropper?.getFile();

	let Blob = (await cropper?.getBlob()) as Blob;

	// 把blob转换成file，type为croppedFileType
	const uploadFile = new File([Blob], croppedFile?.name + 'jpeg' ?? '1.jpeg', { type: croppedFileType, lastModified: croppedFile?.lastModified });

	if (croppedFile) {
		croppedFileURL.value = URL.createObjectURL(croppedFile as Blob);
		const res = await uploadAvatar({ avatar: uploadFile });
		userInfo.value!.user_img = res.result;

		const info = JSON.parse(localStorage.getItem('userInfo') ?? '');
		localStorage.setItem('userInfo', JSON.stringify({ ...info, user_img: res.result }));
		baseStore.user_info.user_img = res.result;
	}
};
// 修改个人资料
const changeAction = async (type: number) => {
	switch (type) {
		case 0:
			windowShowList.value = [false, false, false, false, false, false];
			userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
			break;
		case 1:
			windowShowList.value = [false, false, false, false, false, false];
			await updateUserInfo({ username: userName.value });
			userInfo.value!.user_name = userName.value!;
			localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
			baseStore.user_info.user_name = userName.value!;
			ElMessage.success('修改成功');
			break;
		case 2:
			windowShowList.value = [false, false, false, false, false, false];
			await updateUserInfo({ introduce: userSign.value });
			userInfo.value!.user_sign = userSign.value!;
			localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
			baseStore.user_info.user_sign = userSign.value!;
			ElMessage.success('修改成功');
			break;
	}
};
// 发送验证码
const sendVerifyCode = async (type: number) => {
	switch (type) {
		case 0:
			pwdChangeInfo.value.verify_code_status = true;
			sendCaptchaChangPassword();
			pwdChangeInfo.value.timer = setInterval(() => {
				pwdChangeInfo.value.verify_code_timer--;
				if (pwdChangeInfo.value.verify_code_timer === 0) {
					clearInterval(pwdChangeInfo.value.timer);
					pwdChangeInfo.value.verify_code_status = false;
					pwdChangeInfo.value.verify_code_timer = 60;
				}
			}, 1000);
			break;
		case 1:
			// 邮箱格式校验
			if (validateEmail(emailChangeInfo.value.email) === true) {
				await sendCaptcha({ email: emailChangeInfo.value.email });
				emailChangeInfo.value.verify_code_status = true;
				emailChangeInfo.value.timer = setInterval(() => {
					emailChangeInfo.value.verify_code_timer--;
					if (emailChangeInfo.value.verify_code_timer === 0) {
						clearInterval(emailChangeInfo.value.timer);
						emailChangeInfo.value.verify_code_status = false;
						emailChangeInfo.value.verify_code_timer = 60;
					}
				}, 1000);
			} else {
				ElMessage.error('邮箱格式错误');
			}
			break;
		case 2:
			phoneNumberChangeInfo.value.verify_code_status = true;
			phoneNumberChangeInfo.value.timer = setInterval(() => {
				phoneNumberChangeInfo.value.verify_code_timer--;
				if (phoneNumberChangeInfo.value.verify_code_timer === 0) {
					clearInterval(phoneNumberChangeInfo.value.timer);
					phoneNumberChangeInfo.value.verify_code_status = false;
					phoneNumberChangeInfo.value.verify_code_timer = 60;
				}
			}, 1000);
			break;
	}
};
// 确认修改密码
const confirmPwdChange = async () => {
	if (pwdChangeInfo.value.new_pwd !== pwdChangeInfo.value.confirm_pwd) {
		ElMessage.error('两次密码不一致');
		return;
	} else {
		windowShowList.value[2] = false;
		clearInterval(pwdChangeInfo.value.timer);
		const res = await changPassword({ newPassword: pwdChangeInfo.value.new_pwd, captcha: pwdChangeInfo.value.verify_code });
		if (res.result_code === 0) {
			ElMessage.success('修改成功');
		} else {
			ElMessage.error('修改失败');
		}
		pwdChangeInfo.value = {
			pwd_change_step: 0,
			phone_number: '',
			verify_code: '',
			new_pwd: '',
			confirm_pwd: '',
			verify_code_status: false,
			verify_code_timer: 60,
			timer: 0,
		};
	}
};
// 确认修改邮箱
const confrimEmailChange = async () => {
	// 邮箱格式校验
	if (validateEmail(emailChangeInfo.value.email) === true) {
		if (emailChangeInfo.value.verify_code === '') {
			ElMessage.error('请填写验证码');
		} else {
			windowShowList.value[3] = false;
			await changEmail({ newEmail: emailChangeInfo.value.email, captcha: emailChangeInfo.value.verify_code });
			await updateUserInfo({ email: emailChangeInfo.value.email });
			userInfo.value!.user_email = emailChangeInfo.value.email;
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			baseStore.user_info.user_email = emailChangeInfo.value.email;
			ElMessage.success('修改成功');
			clearInterval(emailChangeInfo.value.timer);
			emailChangeInfo.value = {
				email: '',
				verify_code: '',
				verify_code_status: false,
				verify_code_timer: 60,
				timer: 0,
			};
		}
	} else {
		ElMessage.error('邮箱格式错误');
	}
};
// 确认修改手机号
const confirmPhoneNumberChange = () => {
	ElMessage.success('修改成功');
	windowShowList.value[4] = false;
	userInfo.value!.user_phone = phoneNumberChangeInfo.value.phone_number;
	clearInterval(phoneNumberChangeInfo.value.timer);
	phoneNumberChangeInfo.value = {
		phone_number: '',
		verify_code: '',
		verify_code_status: false,
		verify_code_timer: 60,
		timer: 0,
	};
};

// 监听窗口关闭，清除图片裁剪的缓存
watch(
	() => windowShowList.value[0],
	(newV, _) => {
		if (!newV) {
			sourceFile = null;
			sourceFileURL = '';
			croppedFile = null;
			croppedFileURL.value = '';
		}
	}
);

onBeforeMount(async () => {
	if (localStorage.getItem('userInfo')) {
		userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
		userSign.value = userInfo.value?.user_sign;
		userName.value = userInfo.value?.user_name;
	} else {
		const res = await getUserInfo({});
		if (res.result_code === 0) {
			userInfo.value!.user_email = res.result.email;
			userInfo.value!.user_name = res.result.username;
			userInfo.value!.user_sign = res.result.introduce;
			userInfo.value!.user_img = res.result.avatar;
		} else {
			userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
		}
		userSign.value = userInfo.value?.user_sign;
		userName.value = userInfo.value?.user_name;
	}
});
</script>

<style scoped lang="less">
.MainWindow-wrapper {
	position: relative;
	width: 780px;
	padding: 20px 60px 40px;
	background: #fff;
	transition: all 0.3s ease;
	top: 20px;
	border-radius: 20px;
	&:hover {
		box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
	}
	.user-head {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		cursor: pointer;
		img {
			width: 100px;
		}
		.template {
			position: absolute;
			width: 100px;
			height: 100px;
			border-radius: 50px;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			font-family: Microsoft YaHei;
			font-size: 14px;
			font-weight: normal;
			color: #fff;
			z-index: 10;
		}
	}
	.title {
		margin-right: 104px;
		width: 75px;
		display: flex;
		justify-content: flex-end;
		font-family: Microsoft YaHei;
		font-size: 18px;
		font-weight: normal;
		color: #3d3d3d;
	}
	.content {
		min-width: 180px;
		height: 40px;
		padding: 10px;
		border-radius: 10px;
		background: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		transition: all 0.3s ease;
		font-family: Microsoft YaHei;
		font-size: 18px;
		font-weight: normal;
		color: #999999;
		&:hover {
			box-shadow: inset 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
		}
	}
	.button {
		width: 100px;
		height: 40px;
		border-radius: 20px;
		background: #59a8b9;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
		cursor: pointer;
		font-family: Microsoft YaHei;
		font-size: 14px;
		font-weight: normal;
		color: #fff;
		&:hover {
			box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
		}
	}
}

/* transition动画样式 */
.fade-leave-from,
.fade-enter-to {
	opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
	transition: all 0.3s;
}
.fade-leave-to,
.fade-enter-from {
	opacity: 0;
}

:deep(.el-dialog__header) {
	display: flex;
	justify-content: center;
}
</style>
