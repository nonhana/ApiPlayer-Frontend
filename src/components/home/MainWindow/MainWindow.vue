<template>
	<div class="main-window">
		<el-row>
			<header class="head">{{ props.title }} console.log(undefined)</header>
		</el-row>
		<el-row>
			<div>123</div>
		</el-row>
		<el-row>123</el-row>
	</div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

const props = defineProps<{
	title: string;
}>();
</script>

<style lang="less" scoped>
.main-window {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.head {
	display: flex;
	justify-self: start;
	align-items: center;
	font-family: Source Han Sans CN;
	font-size: 30px;
	font-weight: bold;
	display: flex;
	align-items: center;
	letter-spacing: 0px;
	color: #3d3d3d;
}
</style>
