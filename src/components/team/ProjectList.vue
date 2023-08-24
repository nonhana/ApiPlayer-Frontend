<template>
	<el-dialog v-model="dialogVisible" title="修改名称" width="28%">
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
				<el-button type="default" size="large" auto-insert-space @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChange">保 存</el-button>
			</span>
		</template>
	</el-dialog>
	<div class="project-wrap">
		<div v-for="(project, index) in projectList" :key="index" class="project" @click="goDetail(index)">
			<div class="project-header">
				<div class="project-img">
					<el-image shape="square" size="20" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
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
								<el-dropdown-item @click="deleteProject(index)">删除项目</el-dropdown-item>
								<el-dropdown-item @click="changeProject(index)">项目设置</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
			<div class="project-info">
				<div class="project-name">{{ project.name }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { addRecentProject } from '../../api/projects';
import { teamInfo } from '../../api/teams';

import { useBaseStore } from '../../store/index';
const baseStore = useBaseStore();

interface Project {
	id: number;
	avatar: string;
	name: string;
}

const router = useRouter();
// let projectList = reactive<Project[]>([]);
let projectList = reactive<Project[]>([
	{
		id: 1,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
	},
	{
		id: 2,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
	},
	{
		id: 3,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
	},
	{
		id: 4,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
	},
	{
		id: 5,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
	},
	{
		id: 6,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
	},
]);

const dialogVisible = ref<boolean>(false);
let projectName = ref<string>('');

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

const goDetail = (index: number) => {
	// baseStore.setCurTeamInfo({});
	router.push({ path: `/project/${projectList[index].id}` });
	addRecentProject({ user_id: baseStore.user_info.user_id, project_id: projectList[index].id });
	baseStore.setCurProjectInfo({ project_id: projectList[index].id, project_img: projectList[index].avatar, project_name: projectList[index].name });
	// baseStore.setCurProjectInfo({ project_id: 4, project_img: projectList[index].avatar, project_name: projectList[index].name });
};
const deleteProject = (index: number) => {
	// console.log(222, projectList);
	ElMessageBox.confirm('项目' + projectList[index].name + '将被删除', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			ElMessage({
				type: 'success',
				message: '删除成功',
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消删除',
			});
		});
};
const changeProject = (index: number) => {
	projectName.value = projectList[index].name;
	dialogVisible.value = true;
};
const confirmChange = () => {
	dialogVisible.value = false;
};
onMounted(async () => {
	const res = await teamInfo({ team_id: baseStore.curTeamInfo.team_id, user_id: baseStore.user_info.user_id });
	console.log('teamInfo', res.data);
	// projectList = res.data.project_list;
});
</script>

<style scoped lang="less">
.project-wrap {
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	.project {
		width: 20%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid #f2f4f7;
		border-radius: 8px;
		padding: 16px;
		cursor: pointer;
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
