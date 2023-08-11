<template>
	<div class="container">
		<div class="msg">
			<div class="title">基础信息</div>
			<div class="content">
				<div class="item1">
					<div>团队名称</div>
					<div>....</div>
					<div class="editButton">编 辑</div>
				</div>
				<div class="item2">
					<div>我的团队内昵称</div>
					<div>....</div>
					<div class="editButton">编 辑</div>
				</div>
			</div>
		</div>
		<div class="dangerZone">
			<div class="title">危险区域</div>
			<div class="content">
				<div class="item1">
					<div>移交</div>
					<div>....</div>
					<div class="editButton">移 交</div>
				</div>
				<div class="item2">
					<div>解散团队</div>
					<div>....</div>
					<div class="editButton">解 散</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
.container {
	min-width: 780px;
	height: 100%;
	width: 100%;
	position: relative;
	left: -30px;
	.msg {
		min-width: 780px;
		.content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			border: 1px solid #efefef;
			border-radius: 5px;
			padding: 10px;
			margin-top: 10px;
			.item1 {
				min-width: 780px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.item2 {
				min-width: 780px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.dangerZone {
		min-width: 780px;
		margin-top: 30px;
		.content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			min-width: 780px;
			border: 1px solid #efefef;
			border-radius: 5px;
			padding: 10px;
			margin-top: 10px;
			.item1 {
				min-width: 780px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.item2 {
				min-width: 780px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
	.editButton {
		width: 60px;
		height: 34px;
		background-color: #f6f6f7;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6px;
		font-size: 16px;
	}
}
</style>
