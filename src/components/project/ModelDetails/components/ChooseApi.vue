<template>
	<div class="ChooseApi-wrapper">
		<div class="content">
			<img :src="EmptyLogo" alt="EmptyLogo" />
			<span>请选择一个API</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import EmptyLogo from '@/static/img/emptyLogo.png';
</script>

<style scoped lang="less">
.ChooseApi-wrapper {
	position: relative;
	width: 1000px;
	background-color: #fff;
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #999;
		img {
			width: 300px;
			height: 300px;
		}
	}
}
</style>
