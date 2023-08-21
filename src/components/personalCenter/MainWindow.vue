<template>
	<div class="MainWindow-wrap">
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
		<el-divider></el-divider>
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
		<el-divider></el-divider>
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
		<el-divider></el-divider>
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
		<el-divider></el-divider>
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 60px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>手机号</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_phone }}</span>
				</div>
			</div>
			<div class="button" @click="windowShowList[4] = true">
				<span>修改</span>
			</div>
		</el-row>
		<el-divider></el-divider>
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
					<span>手机号</span>
					<el-input v-model="pwdChangeInfo.phone_number" placeholder="请输入手机号" style="width: 300px"></el-input>
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
import type { UserInfo } from '../../utils/types';
import { ElMessageBox, ElMessage } from 'element-plus';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import { getUserInfo, updateUserInfo, uploadAvatar, sendCaptcha } from '../../api/users.ts';
import { Picture as IconPicture } from '@element-plus/icons-vue';
import { validateEmail } from '../../utils/validate.ts';

// 获取文件上传的input元素
const fileRef = ref<HTMLInputElement>();

let userInfo = ref<UserInfo>({
	user_id: 0,
	user_name: '',
	user_img: '',
	user_email: '',
	user_phone: '',
	user_sign: '',
});
let userSign = ref<string>();
let userName = ref<string>();
let showTemplate = ref<boolean>(false);
let windowShowList = ref<boolean[]>([false, false, false, false, false, false]);
let sourceFile: File | null | undefined = null;
let sourceFileURL: string = '';
let croppedFile: File | null | undefined = null;
let croppedFileURL = ref<string>('');
let pwdChangeInfo = ref({
	pwd_change_step: 0,
	phone_number: '',
	verify_code: '',
	new_pwd: '',
	confirm_pwd: '',
	verify_code_status: false,
	verify_code_timer: 60,
	timer: 0,
});
let emailChangeInfo = ref({
	email: '',
	verify_code: '',
	verify_code_status: false,
	verify_code_timer: 60,
	timer: 0,
});
let phoneNumberChangeInfo = ref({
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
	// windowShowList.value[0] = true;
	sourceFile = fileRef.value?.files?.[0] || null;
	if (sourceFile != null) {
		windowShowList.value[0] = true;
		sourceFileURL = URL.createObjectURL(sourceFile as Blob);
		console.log(sourceFileURL);
	}
};
// 确认裁剪
const confirmCropper = async () => {
	windowShowList.value[0] = false;
	croppedFile = await cropper?.getFile();
	if (croppedFile) {
		croppedFileURL.value = URL.createObjectURL(croppedFile as Blob);
		console.log(croppedFileURL.value);
		uploadAvatar({ avatar: croppedFileURL.value }).then((res) => {
			userInfo.value!.user_img = res.data.result.avatar;
			// userInfo.value!.user_img = croppedFileURL.value;
		});
	}
};
// 修改个人资料
const changeAction = (type: number) => {
	if (type === 0) {
		windowShowList.value = [false, false, false, false, false, false];
		userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
		ElMessage.info('已取消');
	} else if (type === 1) {
		windowShowList.value = [false, false, false, false, false, false];
		updateUserInfo({ username: userName.value }).then(
			() => {
				userInfo.value!.user_name = userName.value!;
				localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
				ElMessage.success('修改成功');
			},
			() => {
				ElMessage.error('修改失败');
			}
		);
	} else if (type === 2) {
		windowShowList.value = [false, false, false, false, false, false];
		updateUserInfo({ introduce: userSign.value }).then(
			() => {
				userInfo.value!.user_sign = userSign.value!;
				localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
				ElMessage.success('修改成功');
			},
			() => {
				ElMessage.error('修改失败');
			}
		);
	}
};

// 发送验证码
const sendVerifyCode = (type: number) => {
	if (type === 0) {
		pwdChangeInfo.value.verify_code_status = true;
		pwdChangeInfo.value.timer = setInterval(() => {
			pwdChangeInfo.value.verify_code_timer--;
			if (pwdChangeInfo.value.verify_code_timer === 0) {
				clearInterval(pwdChangeInfo.value.timer);
				pwdChangeInfo.value.verify_code_status = false;
				pwdChangeInfo.value.verify_code_timer = 60;
			}
		}, 1000);
	} else if (type === 1) {
		// 邮箱格式校验
		if (validateEmail(emailChangeInfo.value.email) == true) {
			sendCaptcha({ email: emailChangeInfo.value.email }).then(
				() => {},
				() => {}
			);
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
	} else if (type === 2) {
		phoneNumberChangeInfo.value.verify_code_status = true;
		phoneNumberChangeInfo.value.timer = setInterval(() => {
			phoneNumberChangeInfo.value.verify_code_timer--;
			if (phoneNumberChangeInfo.value.verify_code_timer === 0) {
				clearInterval(phoneNumberChangeInfo.value.timer);
				phoneNumberChangeInfo.value.verify_code_status = false;
				phoneNumberChangeInfo.value.verify_code_timer = 60;
			}
		}, 1000);
	}
};
// 确认修改密码
const confirmPwdChange = () => {
	if (pwdChangeInfo.value.new_pwd !== pwdChangeInfo.value.confirm_pwd) {
		ElMessage.error('两次密码不一致');
		return;
	}
	ElMessage.success('修改成功');
	windowShowList.value[2] = false;
	clearInterval(pwdChangeInfo.value.timer);
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
};
// 确认修改邮箱
const confrimEmailChange = () => {
	// 邮箱格式校验
	if (validateEmail(emailChangeInfo.value.email) == true) {
		if (emailChangeInfo.value.verify_code == '') {
			ElMessage.error('请填写验证码');
		} else {
			windowShowList.value[3] = false;
			updateUserInfo({ email: emailChangeInfo.value.email }).then(
				() => {
					userInfo.value!.user_email = emailChangeInfo.value.email;
					localStorage.setItem('userInfo', JSON.stringify(userInfo));
					ElMessage.success('修改成功');
					clearInterval(emailChangeInfo.value.timer);
					emailChangeInfo.value = {
						email: '',
						verify_code: '',
						verify_code_status: false,
						verify_code_timer: 60,
						timer: 0,
					};
				},
				() => {
					ElMessage.error('修改失败');
					clearInterval(emailChangeInfo.value.timer);
					emailChangeInfo.value = {
						email: '',
						verify_code: '',
						verify_code_status: false,
						verify_code_timer: 60,
						timer: 0,
					};
				}
			);
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

onBeforeMount(() => {
	if (localStorage.getItem('userInfo')) {
		userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
		userSign.value = userInfo.value?.user_sign;
		userName.value = userInfo.value?.user_name;
	} else {
		getUserInfo().then(
			(res) => {
				// userInfo.value = res.data.result.userInfo;
				userInfo.value!.user_email = res.data.result.userInfo.email;
				userInfo.value!.user_name = res.data.result.userInfo.username;
				userInfo.value!.user_sign = res.data.result.userInfo.introduce;
				userInfo.value!.user_img = res.data.result.userInfo.avatar;
				// console.log(res.data.result.userInfo);
			},
			() => {
				userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
			}
		);
		// userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
		userSign.value = userInfo.value?.user_sign;
		userName.value = userInfo.value?.user_name;
	}
});
</script>

<style scoped lang="less">
.MainWindow-wrap {
	position: relative;
	width: 780px;
	padding: 20px 60px 40px;
	border-radius: 20px;
	background: #ffffff;
	transition: all 0.3s ease;
	top: 20px;
	.title {
		margin-right: 104px;
		width: 75px;
		display: flex;
		justify-content: flex-end;
		span {
			font-family: Microsoft YaHei;
			font-size: 18px;
			font-weight: normal;
			color: #3d3d3d;
		}
	}
	.content {
		min-width: 180px;
		height: 20px;
		padding: 10px;
		border-radius: 10px;
		background: #ffffff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		transition: all 0.3s ease;
		span {
			font-family: Microsoft YaHei;
			font-size: 18px;
			font-weight: normal;
			color: #999999;
		}
	}
	.content:hover {
		box-shadow: inset 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
	}
	.button {
		width: 100px;
		height: 40px;
		border-radius: 1000px;
		background: #59a8b9;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
		cursor: pointer;
		span {
			font-family: Microsoft YaHei;
			font-size: 14px;
			font-weight: normal;
			color: #ffffff;
		}
	}
	.button:hover {
		box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
	}
}
.MainWindow-wrap:hover {
	box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
}
.user-head {
	width: 100px;
	height: 100px;
	border-radius: 1000px;
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
		border-radius: 1000px;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		span {
			font-family: Microsoft YaHei;
			font-size: 14px;
			font-weight: normal;
			color: #ffffff;
		}
		z-index: 10;
	}
}
/* transition动画样式 */
.fade-leave,
.fade-enter-to {
	opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
	transition: all 0.5s;
}
.fade-leave-to,
.fade-enter {
	opacity: 0;
}
/* dialog样式 */
:deep(.el-dialog) {
	border-radius: 20px;
}
:deep(.el-dialog__header) {
	display: flex;
	justify-content: center;
}
</style>
