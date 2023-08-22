<template>
	<div class="CommonAside-wrap">
		<el-dialog v-model="dialogVisible" title="创建团队" width="28%" center>
			<template #header>
				<h1>创建团队</h1>
			</template>
			<el-input v-model="teamName" placeholder="团队名称" autocomplete="off" size="large" />
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmCreate">新 建</el-button>
				</span>
			</template>
		</el-dialog>
		<el-menu class="el-menu-vertical-demo" router :default-active="$route.path">
			<el-sub-menu index="1">
				<template #title>
					<el-icon><User /></el-icon>
					<span>我的团队</span>
				</template>
				<el-menu-item v-for="(team, index) in baseStore.teamInfo" :key="index" :index="'/team/' + team.team_id">{{ team.team_name }}</el-menu-item>
				<el-menu-item @click="createTeam">
					<el-icon><Plus /></el-icon>
					<span>新建团队</span>
				</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="/recentVisit">
				<el-icon><Clock /></el-icon>
				<span>最近访问</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { teamList, addTeam } from '../api/teams';
import router from '../router/index';
import { useRouter, useRoute } from 'vue-router';
import { useBaseStore } from '../store/index';
import { toRaw } from 'vue';

interface TeamInfo {
	team_desc?: string;
	team_id: string;
	team_name: string;
	team_user_name?: string;
}
const customRouter = useRouter();
const baseStore = useBaseStore();
const dialogVisible = ref<boolean>(false);
const teamName = ref<string>('');
const getTeamList = () => {
	teamList({ user_id: baseStore.user_info.user_id }).then(async (res) => {
		if (res.data) {
			baseStore.setTeamInfo(res.data.data);
			customRouter.push({ path: `/team/${res.data.data[0].team_id}` });
		}
	});
};
const createTeam = () => {
	dialogVisible.value = true;
};
const confirmCreate = () => {
	dialogVisible.value = false;
	addTeam({
		user_id: baseStore.user_info.user_id,
		team_name: teamName.value,
		team_desc: '',
		team_user_name: '',
	}).then(async (res) => {
		if (res.data) {
			ElMessage.success('新建团队成功');
		}
	});
};
const recentVisit = () => {};

onMounted(() => {
	getTeamList();
});
</script>

<style scoped lang="less">
.CommonAside-wrap {
	height: 100%;
}

/*左侧导航栏*/
.el-menu-vertical-demo {
	background-color: #fcfcfd;
}

h1 {
	color: rgba(16, 24, 40, 0.8);
	margin-bottom: 10px;
}

.dialog-btn {
	color: #fff;
	font-size: 16px;
	width: 98%;
}

//一般需要用深度选择器才可以设置
:deep(.el-input__inner) {
	&::placeholder {
		text-align: center;
	}
}
</style>
