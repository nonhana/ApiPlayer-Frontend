<template>
	<div class="index">
		<img :src="NotFound" alt="NotFound" />

		<button @click.prevent="router.push('/')">返回首页</button>

		<el-result icon="warning" title="404提示" sub-title="你找的页面走丢了~">
			<template #extra>
				<el-button type="primary" @click="router.push('/')">返回首页</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import NotFound from '@/static/gif/404.gif';

const router = useRouter();
</script>

<style scoped lang="less">
.index {
	position: relative;
	width: 100%;
	img {
		width: 100%;
		height: 100%;
		margin-top: 40px;
	}
	button {
		width: 100%;
		height: 40px;
		margin-top: 20px;
		background-color: #67b5c7;
		font-size: 18px;
		border: none;
	}
}
</style>
