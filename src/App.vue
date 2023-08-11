<template>
	<div :class="classList[classIndex]">
		<el-row type="flex" justify="center">
			<router-view></router-view>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CommonHeader from './components/CommonHeader.vue';

const route = useRoute();
const classList: string[] = ['app', 'login', 'home'];

let classIndex = ref<number>(0);

// 监听路由变化，判断是否为登录页
watch(
	route,
	(newV, _) => {
		if (newV.name === 'login') {
			classIndex.value = 1;
		} else {
			classIndex.value = 0;
		}
	},
	{
		immediate: true,
		deep: true,
	}
);
</script>

<style scoped lang="less">
.app {
	width: 100%;
}
.login {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: linear-gradient(180deg, #59a8b9 0%, rgba(245, 245, 245, 0) 100%);
}
</style>
