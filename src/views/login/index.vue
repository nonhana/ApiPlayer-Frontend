<template>
	<div class="index">
		<div class="window">
			<div class="img">
				<img src="@/static/svg/LoginLogo.svg" />
			</div>
			<LoginWindow />
		</div>
	</div>
</template>

<script setup lang="ts">
import LoginWindow from '@/components/login/LoginWindow.vue';
</script>

<style scoped lang="less">
.index {
	width: 100%;
	height: 100vh;
	background: linear-gradient(180deg, #59a8b9 0%, rgba(245, 245, 245, 0) 100%);
	.window {
		position: absolute;
		left: 65%;
		top: 50%;
		transform: translate(0, -55%);
		width: 400px;
		.img {
			margin-bottom: 20px;
			position: relative;
			display: flex;
			justify-content: center;
		}
	}
}
</style>
