<template>
	<div class="container">
		<div class="items1">
			<div class="item1">
				<div>1</div>
				<div>成员</div>
			</div>
			<div class="item1">
				<div>2</div>
				<div>游客</div>
			</div>
			<div class="item1">
				<div>3</div>
				<div>待定</div>
			</div>
		</div>
		<div class="items2">
			<div class="item2">
				<el-input :prefix-icon="Search" placeholder="搜索"></el-input>
				<div class="inviteButton">邀请成员</div>
			</div>
		</div>
		<div class="items3">表格</div>
	</div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
</script>
<style lang="less" scoped>
.container {
	// width: 100%;
	// display: flex;
	height: 100%;
	padding: 0;
	margin-left: -30px;
	position: relative;
	left: -30px;
	.items1 {
		display: flex;
		height: 160px;
		align-items: center;
		flex-direction: row;
		justify-content: space-evenly;
		border-radius: 6px;
		// padding: 0;
		// margin: 0;

		background-color: #f9fafb;

		.item1 {
			flex: 1;
			min-width: 260px;
			max-width: 500px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-weight: 500;
			// background-color: #f9fafb;
			& > div:first-child {
				font-size: 42px;
			}
		}
	}

	.items2 {
		// flex: 1;
		.item2 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-width: 780px;
			flex: 1;
			margin-top: 20px;
			.el-input {
				width: 200px;
			}
			.inviteButton {
				width: 100px;
				height: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				border-radius: 4px;
				background-color: #9373ee;

				font-size: 16px;
			}
		}
	}
	.items3 {
		margin-top: 20px;
		min-width: 780px;
	}
}
</style>
