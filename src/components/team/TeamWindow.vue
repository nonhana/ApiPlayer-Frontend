<template>
	<div class="team-wrap">
		<div class="team-header">
			<div class="team-name">个人空间</div>
			<div>
				<el-tag class="mx-1" type="warning" effect="light">团队所有者</el-tag>
			</div>
		</div>
		<div class="team-middle">
			<el-dialog v-model="dialogVisible" title="新建项目" width="28%" center>
				<template #header>
					<h1>新建项目</h1>
				</template>
				<el-input v-model="projectName" placeholder="项目名称" autocomplete="off" size="large" />
				<template #footer>
					<span class="dialog-footer">
						<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmCreate">新 建</el-button>
					</span>
				</template>
			</el-dialog>
			<div class="tabs">
				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane label="项目列表" name="first">
						<ProjectList />
					</el-tab-pane>
					<el-tab-pane label="成员/权限" name="second">
						<MemberPermission />
					</el-tab-pane>
					<el-tab-pane label="团队设置" name="third">
						<TeamSetting />
					</el-tab-pane>
				</el-tabs>
				<!-- <el-input v-model="searchContent" class="w-50 m-2" placeholder="搜索" :prefix-icon="Search" />
				<el-button type="primary" color="#59A8B9" auto-insert-space :icon="Plus" class="create-btn" @click="createProject">新建项目</el-button> -->
			</div>
			<!-- <div class="middle-right">
				<div>
					<el-input v-model="searchContent" class="w-50 m-2" placeholder="搜索" :prefix-icon="Search" />
				</div>
				<div>
					<el-button type="primary" color="#59A8B9" auto-insert-space :icon="Plus" class="create-btn" @click="createProject">新建项目</el-button>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { Search, Plus } from '@element-plus/icons-vue';
import ProjectList from '../../components/team/ProjectList.vue';
import MemberPermission from '../../components/team/MemberPermission.vue';
import TeamSetting from '../../components/team/TeamSetting.vue';

const activeName = ref('first');
const searchContent = ref<string>('');
const dialogVisible = ref<boolean>(false);
const projectName = ref<string>('');
const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
const createProject = () => {
	dialogVisible.value = true;
};
const confirmCreate = () => {
	dialogVisible.value = false;
};
</script>

<style scoped lang="less">
.team-wrap {
	width: 100%;
	height: 100%;
	padding: 0 32px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	.team-header {
		display: flex;

		.team-name {
			color: rgba(16, 24, 40, 0.8);
			font-size: 20px;
			font-weight: 500;
			margin-right: 10px;
		}
	}

	.team-middle {
		width: 100%;
		display: flex;
		// justify-content: space-between;

		.tabs {
			width: 100%;
		}
		.middle-right {
			display: flex;
			gap: 10px;
		}
	}
}

.dialog-btn {
	color: #fff;
	font-size: 14px;
	width: 98%;
}

.create-btn {
	color: #fff;
	font-size: 14px;
}

.el-tabs__header {
	width: calc(100% - 565px);
}
</style>
