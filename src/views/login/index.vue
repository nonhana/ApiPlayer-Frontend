<template>
	<div class="index">
		<div class="window">
			<div
				:style="{
					opacity: opacityList[0],
				}"
				class="img"
			>
				<img src="@/static/svg/LoginLogo.svg" />
			</div>
			<div :style="{ opacity: opacityList[1] }" class="login-window">
				<LoginWindow />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LoginWindow from '@/components/login/LoginWindow.vue';

const opacityList = ref([0, 0]);

onMounted(() => {
	setTimeout(() => {
		opacityList.value = [1, 0];
		setTimeout(() => {
			opacityList.value = [1, 1];
		}, 500);
	}, 100);
});
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
			transition: all 0.5s;
		}
		.login-window {
			transition: all 0.5s;
		}
	}
}
</style>
