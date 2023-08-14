<template>
	<div class="container">
		<div v-if="projectList.length == 0" class="empty">
			<div class="imgContainer">
				<img src="../../../../static/svg/FIle.svg" alt="" />
			</div>
			<div class="content" @click="addProject">
				<div class="plus" style="">+</div>
				<div class="title">新建项目</div>
			</div>
		</div>
		<div v-else-if="projectList.length != 0" class="itemsContainer">
			<div
				v-for="(item, index) in projectList"
				:key="item.project_id"
				class="items"
				@mouseenter="mouseEnterHandlerTools(index)"
				@mouseleave="mouseLeaveHandlerTools(index)"
			>
				<div class="projectImg">
					<img :src="item.project_img" />
				</div>
				<div class="projectName">{{ item.project_name }}</div>
				<div
					v-if="isShowToolsList[index]"
					class="tools"
					@mouseenter="mouseEnterHandlerDropdown(index)"
					@mouseleave="mouseLeaveHandlerDropdown(index)"
				>
					<div class="icon">
						<svg
							t="1691749000890"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="15129"
							width="12"
							height="12"
						>
							<path
								d="M150.528 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0zM519.168 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0zM887.808 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0z"
								p-id="15130"
								fill="#2c2c2c"
							></path>
						</svg>
					</div>

					<div v-if="isShowDropdownList[index]" class="dropdown">
						<div class="dropdownItem">
							<img src="../../../../static/svg/Modify.svg" alt="" />
							<div>修改名称</div>
						</div>
						<div class="dropdownItem">
							<img src="../../../../static/svg/Delete.svg" alt="" />
							<div>删除项目</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

interface ProjectList {
	project_id: number;
	project_img: string;
	project_name: string;
}

const addProject = () => {};

let projectList: ProjectList[] = reactive([]);
projectList = [
	{
		project_id: 10,
		project_name: '在段风列参',
		project_img: 'http://dummyimage.com/40x40',
	},
	{
		project_id: 61,
		project_name: '传观加',
		project_img: 'http://dummyimage.com/40x40',
	},
	{
		project_id: 67,
		project_name: '时资二两',
		project_img: 'http://dummyimage.com/40x40',
	},
	{
		project_id: 77,
		project_name: '儿路们类',
		project_img: 'http://dummyimage.com/40x40',
	},
];

// projectList = [];

const isShowDropdownList = ref(Array(projectList.length).fill(false));

const mouseEnterHandlerDropdown = (index: number) => {
	console.log('enter');
	isShowDropdownList.value[index] = true;
};

const mouseLeaveHandlerDropdown = (index: number) => {
	console.log('out');
	isShowDropdownList.value[index] = false;
};

const isShowToolsList = ref(Array(projectList.length).fill(false));

const mouseEnterHandlerTools = (index: number) => {
	isShowToolsList.value[index] = true;
};

const mouseLeaveHandlerTools = (index: number) => {
	isShowToolsList.value[index] = false;
};
</script>

<style lang="less" scoped>
.container {
	height: 100%;
	flex: 1;
	padding: 0;
	// position: relative;

	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.imgContainer {
			width: 100px;
		}

		.content {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 4px 10px;
			border-radius: 4px;
			background-color: #9373ee;

			.plus {
				color: #cabaf7;
				font-size: 18px;
				margin-right: 5px;
			}

			.title {
				color: #fff;
				font-size: 14px;
			}
		}
	}
	.itemsContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding-top: 10px;
		margin-left: -30px;
		margin-bottom: -25px;
		.items {
			height: 200px;
			min-width: 300px;
			max-width: 400px;
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			overflow: visible;

			position: relative;
			margin-right: 25px;
			margin-bottom: 25px;
			border: 1px solid #efefef;
			border-radius: 8px;
			padding: 30px 0 0 30px;

			.projectImg img {
				border-radius: 6px;
				overflow: hidden;
			}
			.projectName {
				margin-top: 30px;
			}
		}

		.tools {
			position: absolute;
			right: 20px;
			background-color: pink;

			.dropdown {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				position: absolute;
				right: -70px;
				// margin-top: 10px;
				background-color: #fff;
				border: 1px solid #efefef;
				border-radius: 6px;
				height: 80px;
				width: 100px;
				.dropdownItem {
					display: flex;
					justify-content: center;
					flex-direction: row;
					align-items: center;
					font-size: 14px;
					img {
						margin-right: 5px;
					}
				}
			}
			.icon {
				width: 32px;
				height: 32px;
				border-radius: 4px;
				display: flex;
				justify-content: center;
				svg {
					width: 20px;
				}
			}
			.icon:hover {
				background-color: #faf8f8;
			}
		}
	}
}
</style>
