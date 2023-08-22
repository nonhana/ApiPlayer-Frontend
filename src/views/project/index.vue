<template>
	<div class="index">
		<CommonHeader />
		<div class="index-main">
			<InterfaceDoc />
		</div>
	</div>
</template>

<script setup lang="ts">
import InterfaceDoc from '@/components/project/ProjectDetails.vue';
import CommonHeader from '@/components/CommonHeader.vue';
</script>

<style scoped lang="less">
.index {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;

	.demo-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}
}
</style>
