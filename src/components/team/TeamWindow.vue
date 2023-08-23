<template>
	<div class="team-wrap">
		<div class="team-header">
			<div class="team-name">{{ baseStore.teamDetailedInfo.team_info.team_name }}</div>
			<div>
				<el-tag :type="colorMap.get(identityMap.get(userIdentity))">{{ identityMap.get(userIdentity) }}</el-tag>
			</div>
		</div>
		<div class="team-middle">
			<el-dialog v-model="dialogVisible" title="新建项目" width="28%" center>
				<template #header>
					<h1>新建项目</h1>
				</template>
				<el-form label-position="top" label-width="100px" :model="addProjectForm" style="max-width: 460px">
					<el-form-item label="项目名称">
						<el-input v-model="addProjectForm.project_name" />
					</el-form-item>
					<el-form-item label="项目图标">
						<div class="user-head" @mouseenter="showTemplate = true" @mouseleave="showTemplate = false">
							<transition name="fade">
								<div class="template" @click="uploadFile">
									<span>重新选取头像</span>
								</div>
							</transition>
							<input v-show="false" ref="fileRef" type="file" @change="fileChange" />
							<el-image :src="addProjectForm!.project_img">
								<template #error>
									<div
										class="image-slot"
										style="
											display: flex;
											justify-content: center;
											align-items: center;
											width: 100px;
											height: 100px;
											background: var(--el-fill-color-light);
											color: var(--el-text-color-secondary);
											font-size: 30px;
										"
									>
										<el-icon><icon-picture /></el-icon>
									</div>
								</template>
							</el-image>
						</div>
						<input v-show="false" ref="fileRef" type="file" @change="fileChange" />
					</el-form-item>
				</el-form>
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
			</div>
			<div v-if="isShowMiddleRight" class="middle-right">
				<div>
					<el-input v-model="searchContent" class="w-50 m-2" placeholder="搜索" :prefix-icon="Search" />
				</div>
				<div>
					<el-button type="primary" color="#59A8B9" auto-insert-space :icon="Plus" class="create-btn" @click="createProject">新建项目</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { TabsPaneContext } from 'element-plus';
import { Search, Plus } from '@element-plus/icons-vue';
import ProjectList from '@/components/team/ProjectList.vue';
import MemberPermission from '@/components/team/MemberPermission.vue';
import TeamSetting from '@/components/team/TeamSetting.vue';
import { useRoute } from 'vue-router';
import { addProject } from '@/api/projects';
import { useBaseStore } from '@/store/index';

interface AddProjectForm {
	user_id: number;
	team_id: number;
	project_name: string;
	project_img: string;
}

const baseStore = useBaseStore();
const colorMap = new Map().set('团队所有者', 'danger').set('团队管理者', 'warning').set('团队成员', 'success').set('游客', 'info');
const identityMap = new Map().set(0, '团队所有者').set(1, '团队管理者').set(2, '团队成员').set(3, '游客');
const userIdentity = ref<number>(0);
const route = useRoute();
const activeName = ref('first');
const searchContent = ref<string>('');
const dialogVisible = ref<boolean>(false);
const projectName = ref<string>('');
const isShowMiddleRight = ref<boolean>(true);
const addProjectForm: AddProjectForm = {
	user_id: baseStore.user_info.user_id,
	team_id: baseStore.teamDetailedInfo.team_info.team_id,
	project_name: '',
	project_img: '',
};

const handleClick = (tab: TabsPaneContext) => {
	if (tab.paneName === 'first') {
		isShowMiddleRight.value = true;
	} else if (tab.paneName == 'second' || tab.paneName == 'third') {
		isShowMiddleRight.value = false;
	}
};
const createProject = () => {
	dialogVisible.value = true;
};
const confirmCreate = () => {
	addProject({
		user_id: baseStore.user_info.user_id,
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		project_name: projectName.value,
		project_img: '',
		project_desc: '',
	}).then(async (res) => {
		if (res.data) {
			ElMessage.success('新建项目成功');
		}
	});
	dialogVisible.value = false;
};

watch(
	() => route.params.team_id,
	async (newV, _) => {
		userIdentity.value = await baseStore.getTeamInfo(Number(newV));
	},
	{ immediate: true, deep: true }
);
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
		align-items: center;

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
			position: absolute;
			right: 50px;
			display: flex;
			gap: 10px;
		}

		:deep(.el-input__inner) {
			&::placeholder {
				text-align: center;
			}
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
