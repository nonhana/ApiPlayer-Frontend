<template>
	<div class="title">最近访问</div>
	<div class="main">
		<div v-for="(item, index) in itemList" :key="index" class="itemList" @click="clickHandler">
			<div class="container">
				<div class="svg">
					<!-- <img src="./img/svg/项目图标.svg" alt="" /> -->
					<!-- <img :src="item.project_img" alt="" /> -->
					<img src="http://dummyimage.com/40x40" alt="" />
				</div>
				<div class="msg">
					<div class="projectName">{{ item.project_name }}</div>
					<div class="time">{{ item.project_visited_date }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { RecentlyVisitedListItem } from '../../../utils/types';
import { useRouter } from 'vue-router';

const router = useRouter();

// import { useBaseStore } from '../../../store/index';

// const store = useBaseStore();

let itemList: Array<RecentlyVisitedListItem> = reactive([
	{
		project_id: 81,
		project_name: '期存离研',
		project_img: 'http://dummyimage.com/400x400',
		project_visited_date: '2023-03-24',
	},
	{
		project_id: 12,
		project_name: '包越书变适设',
		project_img: 'http://dummyimage.com/400x400',
		project_visited_date: '1989-01-07',
	},
	{
		project_id: 79,
		project_name: '并因面金义',
		project_img: 'http://dummyimage.com/400x400',
		project_visited_date: '2016-02-23',
	},
	{
		project_id: 35,
		project_name: '第解反高最精',
		project_img: 'http://dummyimage.com/400x400',
		project_visited_date: '2013-06-06',
	},
]);

// const getItemList = () => {
// 	return store.lastVisitedList;
// };
// let itemList: Array<LastVisitedListItem> = getItemList();

const clickHandler = () => {
	router.push({ path: '/interface' });
};
</script>
<style lang="less" scoped>
.title {
	height: 106px;
	font-family: Source Han Sans CN;
	font-size: 30px;
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
		height: 70px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
		margin-left: 30px;
		.container {
			width: 100%;
			height: 70px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 10px;
			margin-left: 20px;
			border-bottom: 1px solid #dfdfdf;
			&:hover {
				background-color: #fafafa;
			}
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
			height: 60px;
			margin-left: 20px;
		}
		.projectName {
			display: flex;
			flex: 2;
			font-family: Source Han Sans CN;
			font-size: 18px;
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
	.itemList:last-child .container {
		border: none;
	}
}
</style>
