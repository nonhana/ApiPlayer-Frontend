<template>
	<div class="index">
		<InterfaceDoc></InterfaceDoc>
	</div>
</template>

<script setup lang="ts">
import InterfaceDoc from '../../components/interface/InterfaceDoc.vue';
</script>

<style scoped lang="less">
.index {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.demo-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}
}
</style>
