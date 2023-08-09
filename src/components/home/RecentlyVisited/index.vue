<template>
	<div class="title">最近访问</div>
	<div class="main">
		<div v-for="(item, index) in itemList" :key="index" class="itemList">
			<div class="container">
				<div class="svg">
					<img src="./img/svg/项目图标.svg" alt="" />
				</div>
				<div class="msg">
					<div class="projectName">{{ item.projectName }}</div>
					<div class="time">{{ item.lastVisitedTime }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { LastVisitedListItem } from '../../../utils/types';
// import { useBaseStore } from '../../../store/index';

// const store = useBaseStore();

let itemList: Array<LastVisitedListItem> = reactive([
	{ projectName: '项目名称', lastVisitedTime: '10分钟前' },
	{ projectName: '项目名称1111111111', lastVisitedTime: '20分钟前' },
]);

// const getItemList = () => {
// 	return store.lastVisitedList;
// };
// let itemList: Array<LastVisitedListItem> = getItemList();
</script>
<style lang="less" scoped>
.title {
	height: 106px;
	font-family: Source Han Sans CN;
	font-size: 36px;
	font-weight: bold;
	line-height: 50px;
	display: flex;
	align-items: center;
	letter-spacing: 0px;
	margin-left: 40px;
	color: #3d3d3d;
}
.main {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	.itemList {
		width: calc(100% - 40px);
		height: 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
		margin-left: 30px;
		.container {
			width: 100%;
			height: 100px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 10px;
			margin-left: 30px;
			border-bottom: 1px solid #dfdfdf;
		}
		.svg {
			display: flex;
			margin-left: 10px;
		}
		.msg {
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			height: 74px;
			margin-left: 20px;
		}
		.projectName {
			display: flex;
			flex: 2;
			font-family: Source Han Sans CN;
			font-size: 24px;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0px;

			color: #3d3d3d;
		}
		.time {
			display: flex;
			flex: 1;
			font-family: Source Han Sans CN;
			font-size: 14px;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0px;

			color: #3d3d3d;
		}
	}
}
</style>
