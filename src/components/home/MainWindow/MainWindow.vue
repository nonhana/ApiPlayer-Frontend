<template>
	<div class="main-window">
		<div class="container">
			<el-row>
				<header class="head">
					<div class="title">{{ responseTeamInfo.team_info.team_name }}</div>
					<div class="label">{{ responseTeamInfo.team_info.team_user_name }}</div>
				</header>
			</el-row>
			<el-row v-if="isEmpty"></el-row>
			<el-row class="main">
				<el-tabs v-model="activeName" class="tabs" @tab-click="tabHandleClick">
					<el-tab-pane label="团队项目" name="first">
						<TeamProject />
					</el-tab-pane>
					<el-tab-pane label="成员/权限" name="second"><MemberPermission /></el-tab-pane>
					<el-tab-pane label="团队设置" name="third"><TeamSetting /></el-tab-pane>
				</el-tabs>
				<div v-if="isTeamProject && responseTeamInfo?.project_list.length != 0" class="tools">
					<div>
						<el-input :prefix-icon="Search" placeholder="搜索"></el-input>
					</div>
					<div class="impProject"><img src="../../../static/svg/Import.svg" alt="" /></div>
					<div class="newProject" @click="newProject">+</div>
				</div>
			</el-row>
			<!-- <el-row>123</el-row> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import TeamProject from './TeamProject/index.vue';
import MemberPermission from './MemberPermission/index.vue';
import TeamSetting from './TeamSetting/index.vue';

// const router = useRouter();
// const route = useRoute();
// console.log(route.params.id, router);

const activeName = ref('first');

const tabHandleClick = (tab: TabsPaneContext) => {
	if (tab.paneName === 'first') {
		isTeamProject.value = true;
	} else if (tab.paneName == 'second' || tab.paneName == 'third') {
		isTeamProject.value = false;
	}
};

interface MemberList {
	user_email: string;
	user_id: number;
	user_identity: number;
	user_img: string;
	user_name: string;
}

interface ProjectList {
	project_id: number;
	project_img: string;
	project_name: string;
}

interface TeamInfo {
	team_desc: string;
	team_id: string;
	team_name: string;
	team_user_name: string;
}
interface TeamDetailedInfo {
	member_list: MemberList[];
	project_list: ProjectList[];
	result_code: number;
	result_msg: string;
	team_info: TeamInfo;
}

let responseTeamInfo = reactive<TeamDetailedInfo>({
	member_list: [],
	project_list: [],
	result_code: 0,
	result_msg: '',
	team_info: {} as TeamInfo,
});

// const teamId = route.params.id;

const getTeamInfo = () => {
	const teamData = {
		result_code: 0,
		result_msg: 'deserunt consequat',
		member_list: [
			{
				user_id: 41,
				user_name: '孔涛',
				user_img: 'http://dummyimage.com/400x400',
				user_email: 'c.gkmc@qq.com',
				user_identity: 40,
			},
		],
		project_list: [
			// {
			// 	project_id: 10,
			// 	project_name: '在段风列参',
			// 	project_img: 'http://dummyimage.com/400x400',
			// },
			// {
			// 	project_id: 61,
			// 	project_name: '传观加',
			// 	project_img: 'http://dummyimage.com/400x400',
			// },
			// {
			// 	project_id: 67,
			// 	project_name: '时资二两',
			// 	project_img: 'http://dummyimage.com/400x400',
			// },
			// {
			// 	project_id: 77,
			// 	project_name: '儿路们类',
			// 	project_img: 'http://dummyimage.com/400x400',
			// },
		],
		team_info: {
			team_id: '95',
			team_name: '认接运往而果',
			team_desc: 'elit',
			team_user_name: '团队所有者',
		},
	};
	// const teamData = {};
	Object.assign(responseTeamInfo, teamData);
};
getTeamInfo();

// const props = defineProps<{
// 	title: string;
// }>();

// 是否显示没有团队时的页面
const isEmpty = ref(false);

const newProject = () => {};

let isTeamProject = ref(true);
</script>

<style lang="less" scoped>
.main-window {
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin-left: 30px;

		.head {
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			align-items: center;
			letter-spacing: 0px;
			.title {
				font-size: 30px;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #3d3d3d;
			}
			.label {
				align-self: flex-start;
				margin-left: 15px;
				padding: 3px 5px;

				font-family: Source Han Sans CN;
				font-size: 14px;
				background-color: #f4f1fd;
				color: #9091e1;
				border-radius: 3px;
			}
		}

		.main {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			width: 100%;
			.tabs {
				padding: 0;
				// background-color: #f6f6f7;
			}
			.tabs > .el-tabs__content {
				padding: 32px;
				color: #6b778c;
				font-size: 32px;
				font-weight: 600;
			}
			.el-tab-pane {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
			}
			.tools {
				align-self: center;
				align-items: center;
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				margin-right: 20px;

				.newProject {
					width: 36px;
					height: 36px;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #9373ee;
					border-radius: 5px;
					font-size: 30px;
					color: #c9b9f7;
					padding-bottom: 5px;
					box-sizing: border-box;
				}
				.impProject {
					width: 32px;
					height: 32px;
					border: 1px solid #e2dff2;
					margin: 0 15px;
					background-color: #fff;
					border-radius: 5px;
				}
			}
		}
	}
}
</style>
