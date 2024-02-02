<template>
	<div class="CommonAside-wrapper">
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
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { teamList, addTeam } from '@/api/teams';
import { ElMessage } from 'element-plus';

const customRouter = useRouter();
const { baseStore } = useStore();

const dialogVisible = ref<boolean>(false);
const teamName = ref<string>('');

const getTeamList = async () => {
	const { result } = await teamList({ user_id: baseStore.user_info.user_id });
	baseStore.setTeamInfo(result);
	customRouter.push({ path: `/team/${result[0].team_id}` });
};
const createTeam = () => {
	dialogVisible.value = true;
};
const confirmCreate = async () => {
	dialogVisible.value = false;
	const res = await addTeam({
		team_name: teamName.value,
		team_desc: '团队的简介很重要哦~',
		team_user_name: baseStore.user_info.user_name, // 默认是自己的用户名
	});

	if (res.result_code === 0) {
		ElMessage.success('新建团队成功');
		getTeamList();
	}
};

onMounted(() => {
	getTeamList();
});
</script>

<style scoped lang="less">
.CommonAside-wrapper {
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
</style>
