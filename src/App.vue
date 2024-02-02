<template>
	<div :class="classList[classIndex]">
		<el-row type="flex" justify="center">
			<router-view />
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
}
</style>
