<template>
	<div class="MainWindow-wrap">
		<el-row type="flex" justify="start" style="align-items: center; width: 100%; height: 120px">
			<div class="title">
				<span>头像</span>
			</div>
			<div class="user-head" @mouseenter="showTemplate = true" @mouseleave="showTemplate = false">
				<transition name="fade">
					<div v-if="showTemplate" class="template">
						<span>重新选取头像</span>
					</div>
				</transition>
				<img :src="userInfo!.user_img" />
			</div>
		</el-row>
		<el-divider></el-divider>
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 80px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>名称</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_name }}</span>
				</div>
			</div>
			<div class="button">
				<span>编辑</span>
			</div>
		</el-row>
		<el-divider></el-divider>
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 80px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>密码</span>
				</div>
				<div class="content">
					<span>************</span>
				</div>
			</div>
			<div class="button">
				<span>编辑</span>
			</div>
		</el-row>
		<el-divider></el-divider>
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 80px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>邮箱</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_email }}</span>
				</div>
			</div>
			<div class="button-group">
				<div class="button">
					<span>解绑</span>
				</div>
				<div class="button">
					<span>修改</span>
				</div>
			</div>
		</el-row>
		<el-divider></el-divider>
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 80px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>手机号</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_phone }}</span>
				</div>
			</div>
			<div class="button-group">
				<div class="button">
					<span>解绑</span>
				</div>
				<div class="button">
					<span>修改</span>
				</div>
			</div>
		</el-row>
		<el-divider></el-divider>
		<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; height: 80px">
			<div style="display: flex; justify-content: flex-start; align-items: center">
				<div class="title">
					<span>个人简介</span>
				</div>
				<div class="content">
					<span>{{ userInfo!.user_sign }}</span>
				</div>
			</div>
			<div class="button">
				<span>编辑</span>
			</div>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import type { UserInfo } from '../../utils/types';

let userInfo = ref<UserInfo>();
let showTemplate = ref<boolean>(false);

onBeforeMount(() => {
	userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '{}');
	console.log(userInfo.value);
});
</script>

<style scoped lang="less">
.MainWindow-wrap {
	position: relative;
	width: 780px;
	padding: 0 60px 40px;
	border-radius: 20px;
	background: #ffffff;
	transition: all 0.3s ease;
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
	.button-group {
		display: flex;
		div {
			margin-left: 20px;
		}
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
		height: 100px;
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
	}
}
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
</style>
