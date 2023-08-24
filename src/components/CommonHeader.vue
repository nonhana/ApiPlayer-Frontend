<template>
	<div class="CommonHeader-wrap">
		<img style="cursor: pointer" src="../static/svg/HeaderLogo.svg" @click="userAction('3')" />
		<div class="user-info">
			<img class="message" src="../static/svg/HeaderMessage.svg" />
			<el-dropdown class="user-head" @command="userAction">
				<img :src="userInfo.user_img" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="1">
							<div class="choice">
								<img src="../static/svg/HeaderPersonalCenter.svg" />
								<span>个人中心</span>
							</div>
						</el-dropdown-item>
						<el-dropdown-item command="2">
							<div class="choice">
								<img src="../static/svg/HeaderExit.svg" />
								<span>退出登录</span>
							</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import type { UserInfo } from '../utils/types';

const router = useRouter();
const route = useRoute();
const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') as string);

const userAction = (command: string) => {
	switch (command) {
		case '1':
			router.push({
				path: `/personalCenter/${userInfo.user_id}`,
			});
			break;
		case '2':
			localStorage.clear();
			router.push({
				name: 'login',
			});
			break;
		case '3':
			// 当前路由如果是team开头的，意味已经到首页了
			if (route.fullPath.split('/')[1] != 'team' && route.fullPath.split('/')[1] != 'recentVisit') {
				router.push({
					path: '/',
				});
			}
			break;
	}
};
</script>

<style scoped lang="less">
.CommonHeader-wrap {
	position: relative;
	width: 1300px;
	height: 60px;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.user-info {
		display: flex;
		align-items: center;
		.message {
			margin-right: 40px;
			cursor: pointer;
		}
		.user-head {
			margin-right: 20px;
			width: 40px;
			height: 40px;
			border-radius: 20px;
			overflow: hidden;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 40px;
				height: 40px;
			}

			span {
				font-family: Microsoft YaHei;
				font-size: 14px;
				font-weight: normal;
				color: #3d3d3d;
			}
		}
	}
}

.choice {
	padding: 5px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		margin-right: 10px;
	}
}
</style>
