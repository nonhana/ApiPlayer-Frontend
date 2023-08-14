<template>
	<img src="../../static/gif/404.gif" />
	<button
		@click="
			(event) => {
				event.preventDefault();
				console.log(event);
				$router.push('/');
			}
		"
	>
		返回首页
	</button>
	<!-- <el-result icon="warning" title="404提示" sub-title="你找的页面走丢了~">
		<template #extra>
			<el-button type="primary" @click="$router.push('/')">返回首页</el-button>
		</template>
	</el-result> -->
</template>

<script setup></script>

<style scoped lang="less">
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
</style>
