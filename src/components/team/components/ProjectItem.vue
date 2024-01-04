<template>
	<div class="ProjectItem-wrapper" @click="goDetail(index)">
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
			<div v-if="canDeleteProject(project.project_id)">
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { addRecentProject, deleteProject, updateProjectBasicInfo } from '@/api/projects';
import { ProjectRole } from '@/utils/projectPermission';
import type { Project } from '@/utils/types';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

defineProps<{
	project: Project;
	index: number;
}>();

const route = useRoute();
const router = useRouter();
const { baseStore } = useStore();

const projectName = ref<string>('');
const changeProjectDialog = ref<boolean>(false);
const formRef = ref<FormInstance>();
const form = reactive<{
	name: string;
}>({
	name: '',
});
const rules = reactive<
	FormRules<{
		name: string;
	}>
>({
	name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
});

let projectId: number = 0;

const canVisitProject = (index: number) => {
	return baseStore.projectRoleList[baseStore.teamDetailedInfo.project_list[index].project_id!] !== ProjectRole.NO_ACCESS;
};
const canDeleteProject = (id: number): boolean => {
	const roleList: any = baseStore.projectRoleList;
	return roleList[id] === ProjectRole.ADMIN;
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
const goDetail = async (index: number) => {
	if (canVisitProject(index) === true) {
		await addRecentProject({
			user_id: baseStore.user_info.user_id,
			project_id: baseStore.teamDetailedInfo.project_list[index].project_id,
		});
		router.push({ path: `/project/${baseStore.teamDetailedInfo.project_list[index].project_id}` });
	} else {
		ElNotification({
			title: '权限不足',
			message: '禁止访问',
			type: 'warning',
		});
	}
};
</script>

<style scoped lang="less">
.ProjectItem-wrapper {
	margin: 30px;
	width: 250px;
	display: flex;
	flex-direction: column;
	border: 1px solid #f2f4f7;
	border-radius: 8px;
	padding: 16px;
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.16);
	}
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
	.dialog-btn {
		color: #fff;
		font-size: 14px;
	}
}
</style>
