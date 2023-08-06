<template>
	<div class="container">
		<img src="./imgs/ApiPlayer.png" alt="" class="logo" />
		<div class="login">
			<div class="title">登录</div>
			<div class="email">
				<div>邮箱</div>
				<el-input v-model="email" class="elInputEmail" placeholder="请输入邮箱" style="background-color: #f5f5f5" />
			</div>
			<div class="passward">
				<div style="height: 100%; line-hight: 50px; !important">密码</div>
				<el-input v-model="passward" class="elInputPassward" placeholder="请输入密码" style="background-color: #f5f5f5" />
			</div>
		</div>
		<!-- <div class="login"></div> -->
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const email = ref('');
const passward = ref('');
</script>

<style lang="less" scoped>
.container {
	position: relative;
	width: 1350px;
	height: 1000px;
	// width: 100%;
	// height: 100%;
	opacity: 1;

	background: linear-gradient(180deg, #59a8b9 0%, rgba(245, 245, 245, 0) 100%);

	.logo {
		position: absolute;
		left: 922px;
		top: 64px;
		width: 249px;
		height: 86px;
		opacity: 1;

		font-family: SmileySans Oblique;
		font-size: 72px;
		font-weight: normal;
		letter-spacing: 0em;

		color: #3d3d3d;
	}
	.login {
		position: absolute;
		left: 796px;
		top: 200px;
		width: 500px;
		height: 600px;
		border-radius: 50px;
		opacity: 1;

		background-color: #ffffff;

		.title {
			position: absolute;
			left: 214px;
			top: 41px;
			width: 72px;
			height: 48px;
			opacity: 1;

			font-family: Microsoft YaHei;
			font-size: 36px;
			font-weight: normal;
			letter-spacing: 0em;

			color: #3d3d3d;
		}
		.email {
			position: absolute;
			left: 50px;
			top: 150px;
			width: 400px;
			height: 50px;
			opacity: 1;
			display: flex;
			justify-content: space-between;
			.elInputEmail {
				position: absolute;
				left: 100px;
				top: 0px;
				width: 300px;
				height: 50px;
				border-radius: 10px;
				opacity: 1;

				// background: #f5f5f5;
			}

			// position: absolute;
			// left: 100px;
			// top: 0px;
			width: 300px;
			height: 50px;
			border-radius: 10px;
			opacity: 1;

			background-color: #f5f5f5;
		}
		.passward {
			position: absolute;
			left: 50px;
			top: 250px;
			width: 400px;
			height: 50px;
			opacity: 1;
			display: flex;
			justify-content: space-between;
			.elInputPassward {
				position: absolute;
				left: 100px;
				top: 0px;
				width: 300px;
				height: 50px;
				border-radius: 10px;
				opacity: 1;

				background-color: #f5f5f5;
			}
		}
	}
}
</style>
