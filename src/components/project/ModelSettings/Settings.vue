<template>
	<el-dialog v-model="changeTeamNameDialog" title="修改项目名称" width="28%">
		<template #header>
			<div class="dialog-title">修改项目名称</div>
		</template>
		<el-form ref="teamFormRef" :model="teamForm" :rules="teamRules" status-icon label-position="top" label-width="100px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="projectName" placeholder="" autocomplete="off" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeTeamNameDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeTeamName">保 存</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="changeTeamDescDialog" title="修改简介" width="28%">
		<template #header>
			<div class="dialog-title">简介</div>
		</template>
		<el-form ref="teamFormRef" :model="teamForm" :rules="teamRules" status-icon label-position="top" label-width="100px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="projectDesc" placeholder="" autocomplete="off" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeTeamDescDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeTeamDesc">保 存</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="changeMyNameDialog" title="修改昵称" width="28%">
		<template #header>
			<div class="dialog-title">修改昵称</div>
		</template>
		<el-form ref="userFormRef" :model="userForm" :rules="userRules" status-icon label-position="top" label-width="100px">
			<el-form-item label="我的团队内昵称" prop="name">
				<el-input v-model="myName" placeholder="" autocomplete="off" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeMyNameDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeMyName">确定</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="moveToOtherTeamDialog" title="移交团队" width="25%">
		<template #header>
			<div class="dialog-title">移交团队</div>
		</template>
		<div class="input-label">选择团队</div>
		<el-select v-model="receiver" placeholder="" class="select">
			<el-option v-for="item in receivers" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="moveToOtherTeamDialog = false">取 消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmMoveToOtherTeam">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="deleteTeamDialog" title="解散团队?" width="33%">
		<template #header>
			<div class="dialog-title">修改名称</div>
		</template>
		<div class="alert">
			删除后数据将不可恢复，本操作会删除项目<strong>{{ projectName }}</strong>
			下所有接口、用例 、数据结构、测试集合等。建议先导出项目数据后再执行本操作。
		</div>
		<div class="input-label"><span style="color: red">* </span> 请输入项目名确定操作</div>
		<el-input v-model="printTeamName" placeholder="项目名称" autocomplete="off" size="large" />
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="deleteTeamDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmDelete"> 删除项目 </el-button>
			</span>
		</template>
	</el-dialog>
	<div class="setting-wrap">
		<div class="header">基本设置</div>
		<el-divider />
		<div class="container">
			<div class="container-header">基本信息</div>
			<div class="content">
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">项目名称</div>
							<div class="label description">ApiPlayer</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeTeamName">编 辑</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">项目ID</div>
							<div class="label description">{{ 3099285 }}</div>
						</div>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">项目图标</div>
							<div class="label description">
								<img v-if="projectInfo?.project_img" :src="projectInfo.project_img" alt="" />
								<img v-if="!projectInfo?.project_img" style="width: 40px; border-radius: 6px" src="../../../static/projectIcons/12.jpg" />
							</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button">编 辑</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">简介</div>
							<div class="label description">{{ projectInfo?.project_desc ?? '' }}</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeTeamDesc">编 辑</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">我的团队内昵称</div>
							<div class="label description">G4S</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeMyName">编 辑</el-button>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="container-header">项目操作</div>
				<div class="content">
					<div class="list">
						<div class="left">
							<div class="left-content">
								<div class="label title">克隆项目</div>
								<div class="label description">克隆项目到当前团队或其他团队</div>
							</div>
						</div>
						<div>
							<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeMyName">克隆项目</el-button>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
		<div class="container">
			<div class="container-header warning">
				<el-icon size="15"><WarnTriangleFilled /></el-icon>危险区域
			</div>
			<div class="content warning-content">
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">移动项目</div>
							<div class="label description">将项目移动到其他团队</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="moveToOtherTeam">移动项目</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">删除项目</div>
							<div class="label description">务必谨慎，删除后项目不可以找回</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="handleDeleteTeam" style="color: red">删 除</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { getProjectInfo, updataBasicInfo, deleteProject } from '@/api/projects';
import { useBaseStore } from '@/store/index';

interface ProjectInfo {
	project_current_type?: number;
	project_desc?: string;
	project_id?: number;
	project_img?: string;
	project_name?: string;
	team_id?: number;
}

const baseStore = useBaseStore();

const deleteTeamDialog = ref(false);
const moveToOtherTeamDialog = ref(false);
const changeTeamNameDialog = ref(false);
const changeTeamDescDialog = ref(false);
const changeMyNameDialog = ref(false);

let projectInfo = reactive<ProjectInfo>({});
let projectName = ref('ApiPalyer');
let projectDesc = ref('第六届青训营前端大项目2 - HTTP 接口管理平台');

const myName = ref('');
const printTeamName = ref('');
const receiver = ref('');
const receivers = reactive([]);
interface RuleForm {
	name: string;
}
const teamFormRef = ref<FormInstance>();
const teamForm = reactive<RuleForm>({
	name: '',
});
const teamRules = reactive<FormRules<RuleForm>>({
	name: [{ required: true, message: '请输入团队名称', trigger: 'blur' }],
});
const userFormRef = ref<FormInstance>();
const userForm = reactive<RuleForm>({
	name: '',
});
const userRules = reactive<FormRules<RuleForm>>({
	name: [{ required: true, message: '请输入团队内名称', trigger: 'blur' }],
});

const getProjectInfos = async () => {
	const res = await getProjectInfo({
		// project_id: baseStore.curProjectInfo.project_id ?? 4,
		project_id: 3,
	});
	projectInfo = res.data.project_info;
	projectDesc.value = projectInfo?.project_desc ?? '';
	projectName.value = projectInfo?.project_name ?? '';
};

const changeTeamName = () => {
	changeTeamNameDialog.value = true;
};
const confirmChangeTeamName = async () => {
	changeTeamNameDialog.value = false;
	await updataBasicInfo({ project_name: projectName.value });
	await getProjectInfos();
	projectName.value = projectInfo!.project_name!;
};
const changeTeamDesc = () => {
	changeTeamDescDialog.value = true;
};
const confirmChangeTeamDesc = async () => {
	changeTeamDescDialog.value = false;
	await updataBasicInfo({ project_desc: projectDesc.value });
	await getProjectInfos();
	projectDesc.value = projectInfo.project_desc!;
};
const changeMyName = () => {
	changeMyNameDialog.value = true;
};
const confirmChangeMyName = () => {
	changeMyNameDialog.value = false;
};
const moveToOtherTeam = () => {
	moveToOtherTeamDialog.value = true;
};
const confirmMoveToOtherTeam = () => {
	moveToOtherTeamDialog.value = false;
};
const handleDeleteTeam = () => {
	deleteTeamDialog.value = true;
};
const confirmDelete = () => {
	// console.log(baseStore.curProjectInfo.project_name);
	if (printTeamName.value === baseStore.curProjectInfo.project_name) {
		deleteTeamDialog.value = false;
		deleteProject({ project_id: baseStore.curProjectInfo.project_id! });
	} else {
		ElMessage.error('项目名输入错误');
	}
};

onMounted(async () => {
	getProjectInfos();
	// if (baseStore.curProjectInfo.project_id !== undefined) {
	// const res = await getProjectInfo({
	// 	// project_id: baseStore.curProjectInfo.project_id ?? 4,
	// 	project_id: 3,
	// });
	// projectInfo = res.data.project_info;
	// console.log(res.data);
	// }
});
</script>

<style scoped lang="less">
.setting-wrap {
	width: 90%;
	margin-left: 50px;
	.header {
		height: 80px;
		font-size: 24px;
		margin-top: 40px;
		// border-bottom: 1px solid #eaecf0;
	}

	.container {
		margin-bottom: 40px;

		.container-header {
			font-weight: 500;
			font-size: 16px;
			margin: 12px 0 5px 0;
		}

		.warning {
			color: #e5bf28;
		}

		.content {
			padding: 12px;
			border: 1px solid #c8c9ca;
			border-radius: 8px;
			.list {
				padding: 12px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// gap: 40%;
				.left {
					// flex: 3;
					display: flex;
					flex: 1 1;
					align-items: flex-start;
					.left-content {
						display: flex;
						flex: 1 0;
						.label {
							font-size: 16px;
							font-weight: 500;
						}
						.title {
							flex: 0.5;
						}
						.description {
							flex: 1;
							color: rgba(16, 24, 40, 0.8);
							text-align: left;
							font-size: 14px;
						}
					}
				}
				.button {
					flex: 0 0 auto;
					margin-left: 48px;
					color: rgba(16, 24, 40, 0.8);
					border: none;
				}
			}
		}
		.warning-content {
			border-color: #e5bf28;
		}
	}
}

.alert {
	margin-bottom: 20px;
}

.input-label {
	margin-bottom: 5px;
}

.select {
	width: 100%;
}

.dialog-btn {
	color: #fff;
	font-size: 14px;
}

:deep(.el-divider--horizontal) {
	margin: 0;
}
</style>
