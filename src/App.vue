<template>
	<div :class="appClass">
		<el-row type="flex" justify="center">
			<router-view></router-view>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const classList: string[] = ['app', 'login'];

const classIndex = computed(() => {
	return route.name === 'login' ? 1 : 0;
});

const appClass = computed(() => {
	return classList[classIndex.value];
});
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
