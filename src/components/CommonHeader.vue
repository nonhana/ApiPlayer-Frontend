<template>
	<div class="CommonHeader-wrapper">
		<img style="cursor: pointer" :src="HeaderLogo" alt="HeaderLogo" @click="userAction('3')" />
		<div class="user-info">
			<el-dropdown class="user-head" @command="userAction">
				<img :src="userImg" alt="avatar" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="1">
							<div class="choice">
								<img :src="HeaderPersonalCenter" alt="HeaderPersonalCenter" />
								<span>个人中心</span>
							</div>
						</el-dropdown-item>
						<el-dropdown-item command="2">
							<div class="choice">
								<img :src="HeaderExit" alt="HeaderExit" />
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
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import type { UserInfo } from '@/utils/types';
import HeaderLogo from '@/static/svg/HeaderLogo.svg';
import HeaderPersonalCenter from '@/static/svg/HeaderPersonalCenter.svg';
import HeaderExit from '@/static/svg/HeaderExit.svg';

const router = useRouter();
const route = useRoute();

const { baseStore } = useStore();

const userImg = ref<string>(baseStore.user_info.user_img);
const userInfo = reactive<UserInfo>(baseStore.user_info);

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
			if (route.fullPath.split('/')[1] !== 'team' && route.fullPath.split('/')[1] !== 'recentVisit') {
				router.push({
					path: '/',
				});
			}
			break;
	}
};
</script>

<style scoped lang="less">
.CommonHeader-wrapper {
	position: relative;
	width: 100%;
	padding: 0 20px;
	height: 60px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #bdbdbd;

	.user-info {
		display: flex;
		align-items: center;

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
			font-family: Microsoft YaHei;
			font-size: 14px;
			font-weight: normal;
			color: #3d3d3d;
			img {
				width: 40px;
				height: 40px;
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
