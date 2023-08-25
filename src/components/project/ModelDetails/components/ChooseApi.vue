<template>
	<div class="ChooseApi-wrap">
		<div class="content">
			<img src="@/static/img/emptyLogo.png" />
			<span>请选择一个API</span>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.ChooseApi-wrap {
	width: 1000px;
	background-color: fff;
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		img {
			width: 300px;
			height: 300px;
		}
		span {
			font-size: 16px;
			color: #999;
		}
	}
}
</style>
