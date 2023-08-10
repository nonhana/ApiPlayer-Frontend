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
					<el-tab-pane label="团队项目" name="first"></el-tab-pane>
					<el-tab-pane label="成员/权限" name="second">Config</el-tab-pane>
					<el-tab-pane label="团队设置" name="third">Role</el-tab-pane>
				</el-tabs>
			</el-row>
			<el-row>123</el-row>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';

const router = useRouter();
const route = useRoute();
console.log(route.params.id, router);

const activeName = ref('first');

const tabHandleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
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

/**
 * 团队信息
 */
interface TeamInfo {
	team_desc: string;
	team_id: string;
	team_name: string;
	team_user_name: string;
}
interface ResponseTeamInfo {
	member_list: MemberList[];
	project_list: ProjectList[];
	result_code: number;
	result_msg: string;
	team_info: TeamInfo;
}

let responseTeamInfo = reactive<ResponseTeamInfo>({
	member_list: [],
	project_list: [],
	result_code: 0,
	result_msg: '',
	team_info: {} as TeamInfo,
});

const teamId = route.params.id;

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
			{
				project_id: 10,
				project_name: '在段风列参',
				project_img: 'http://dummyimage.com/400x400',
			},
			{
				project_id: 61,
				project_name: '传观加',
				project_img: 'http://dummyimage.com/400x400',
			},
			{
				project_id: 67,
				project_name: '时资二两',
				project_img: 'http://dummyimage.com/400x400',
			},
			{
				project_id: 77,
				project_name: '儿路们类',
				project_img: 'http://dummyimage.com/400x400',
			},
		],
		team_info: {
			team_id: '95',
			team_name: '认接运往而果',
			team_desc: 'elit',
			team_user_name: '团队所有者',
		},
	};
	Object.assign(responseTeamInfo, teamData);
};
getTeamInfo();

// const props = defineProps<{
// 	title: string;
// }>();

// 是否显示没有团队时的页面
const isEmpty = ref(false);
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
			.tabs > .el-tabs__content {
				padding: 32px;
				color: #6b778c;
				font-size: 32px;
				font-weight: 600;
			}
		}
	}
}
</style>
