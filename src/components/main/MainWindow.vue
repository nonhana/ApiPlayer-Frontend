<template>
	<div class="main">
		<el-container>
			<el-header>
				<CommonHeader />
			</el-header>
			<el-container>
				<el-aside class="aside">
					<CommonAside />
				</el-aside>
				<el-main class="main">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CommonHeader from '../CommonHeader.vue';
import CommonAside from '../CommonAside.vue';

const route = useRoute();
// const classList: string[] = ['app', 'login'];

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
.login {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: linear-gradient(180deg, #59a8b9 0%, rgba(245, 245, 245, 0) 100%);
}

.header {
	width: 100%;
	height: 60px;
}

.aside {
	width: 250px;
	height: calc(100vh - 60px);
	background-color: #fcfcfd;
}

.main {
	width: 100%;
	// width: calc(100% - 250px);
	background-color: #fff;
}
</style>
