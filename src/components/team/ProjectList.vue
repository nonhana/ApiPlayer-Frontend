<template>
	<el-dialog v-model="changeProjectDialog" title="修改名称" width="28%">
		<template #header>
			<div class="dialog-title">修改名称</div>
		</template>
		<el-form ref="formRef" :model="form" :rules="rules" status-icon label-position="top" label-width="100px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="projectName" placeholder="项目名称" autocomplete="off" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeProjectDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChange">保 存</el-button>
			</span>
		</template>
	</el-dialog>

	<div class="project-wrap">
		<div v-if="baseStore.teamDetailedInfo.project_list.length === 0" class="empty-alert">
			<el-empty description="该团队目前还没有项目哦~" :image-size="200" />
		</div>
		<div v-for="(project, index) in baseStore.teamDetailedInfo.project_list" :key="index" class="project" @click="goDetail(index)">
			<div class="project-header">
				<div class="project-img">
					<el-image shape="square" size="20" :src="project.project_img">
						<template #error>
							<div class="image-slot">
								<el-icon><Picture /></el-icon>
							</div>
						</template>
					</el-image>
				</div>
				<div>
					<el-dropdown size="large">
						<el-icon><More /></el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="confirmDeleteProject(index)">删除项目</el-dropdown-item>
								<el-dropdown-item @click="changeProject(index)">项目设置</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
			<div class="project-info">
				<div class="project-name">{{ project.project_name }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { addRecentProject, deleteProject, updateProjectBasicInfo } from '@/api/projects';
import { teamInfo } from '@/api/teams';
import { useBaseStore } from '@/store';

const router = useRouter();
const route = useRoute();
const baseStore = useBaseStore();
const changeProjectDialog = ref<boolean>(false);
const projectName = ref<string>('');

let projectId: number = 0;

interface RuleForm {
	name: string;
}
const formRef = ref<FormInstance>();
const form = reactive<RuleForm>({
	name: '',
});
const rules = reactive<FormRules<RuleForm>>({
	name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
});

const goDetail = async (index: number) => {
	router.push({ path: `/project/${baseStore.teamDetailedInfo.project_list[index].project_id}` });
	const res = await addRecentProject({ user_id: baseStore.user_info.user_id, project_id: baseStore.teamDetailedInfo.project_list[index].project_id });
	console.log(res.data);
};
const confirmDeleteProject = (index: number) => {
	ElMessageBox.confirm('项目 ' + baseStore.teamDetailedInfo.project_list[index].project_name + ' 将被删除', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const res = await deleteProject({ project_id: baseStore.teamDetailedInfo.project_list[index].project_id });
			if (res.data.result_code === 0) {
				ElMessage({
					type: 'success',
					message: '删除成功',
				});
				await baseStore.getTeamInfo(Number(route.params.team_id));
			} else {
				ElMessage({
					type: 'error',
					message: '删除失败',
				});
			}
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消删除',
			});
		});
};
const changeProject = (index: number) => {
	projectName.value = baseStore.teamDetailedInfo.project_list[index].project_name;
	projectId = baseStore.teamDetailedInfo.project_list[index].project_id;
	changeProjectDialog.value = true;
};
const confirmChange = async () => {
	await updateProjectBasicInfo({
		project_id: projectId,
		project_name: projectName.value,
	});
	await baseStore.getTeamInfo(Number(route.params.team_id));
	projectId = 0;
	changeProjectDialog.value = false;
};

onMounted(async () => {
	await teamInfo({ team_id: baseStore.curTeamInfo.team_id });
});
</script>

<style scoped lang="less">
.project-wrap {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.project {
		margin: 30px;
		width: 250px;
		display: flex;
		flex-direction: column;
		border: 1px solid #f2f4f7;
		border-radius: 8px;
		padding: 16px;
		cursor: pointer;
		transition: all 0.3s;
		.dialog-title {
			color: rgba(16, 24, 40, 0.8);
			font-size: 16px;
			font-weight: 500;
		}
		.project-header {
			display: flex;
			justify-content: space-between;
			.project-img {
				width: 40px;
				height: 40px;
			}
		}
		.project-info {
			display: flex;
			flex-direction: column;
			gap: 4px;
			.project-name {
				color: rgba(16, 24, 40, 0.8);
				font-weight: 500;
				font-size: 14px;
			}
		}
	}
	.project:hover {
		box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.16);
	}
	.empty-alert {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.dialog-btn {
	color: #fff;
	font-size: 14px;
}

//去除下拉框的黑色边框
:focus {
	outline: 0;
}
</style>
