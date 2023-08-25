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
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeProjectName"
					>保 存</el-button
				>
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
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeProjectDesc"
					>保 存</el-button
				>
			</span>
		</template>
	</el-dialog>
	<!-- <el-dialog v-model="changeMyNameDialog" title="修改昵称" width="28%">
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
	</el-dialog> -->
	<!-- 移交团队 -->
	<!-- <el-dialog v-model="moveToOtherTeamDialog" title="移交团队" width="25%">
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
	</el-dialog> -->
	<el-dialog v-model="deleteTeamDialog" title="删除项目?" width="33%">
		<template #header>
			<div class="dialog-title">删除项目</div>
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
	<el-dialog v-model="uploadIconDialog" title="上传图标" width="33%" :before-close="handleClose">
		<div class="uploadBtn" @click="uploadFile">选择图标</div>
		<!-- <div style="">
			预 览<img v-show="sourceFileURL !== ''" :src="sourceFileURL" alt="" style="width: 40px; height: 40px; border: 1px solid rgb(220, 217, 217)" />
		</div> -->
		<input v-show="false" ref="fileRef" placeholder="选择图标" autocomplete="off" type="file" @change="fileChange" />
		<!-- <template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="uploadIconDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmUploadIcon()">上 传</el-button>
			</span>
		</template> -->
	</el-dialog>

	<el-dialog v-model="windowShowList[0]" title="图片裁剪" width="800px" :before-close="handleClose">
		<vue-picture-cropper
			:box-style="{
				width: '100%',
				maxHeight: '500px',
				backgroundColor: '#f8f8f8',
				margin: 'auto',
			}"
			:img="sourceFileURL"
			:options="{
				viewMode: 1,
				dragMode: 'crop',
				aspectRatio: 1 / 1,
				outputType: 'jpeg',
			}"
		/>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="windowShowList[0] = false">取消</el-button>
				<el-button color="#59A8B9" @click="confirmCropper()"><span style="color: #fff">确认</span></el-button>
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
							<div class="label description">{{ projectInfo?.project_name }}</div>
						</div>
					</div>
					<div v-if="canModifyProjectInfo">
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeTeamName">编 辑</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">项目ID</div>
							<div class="label description">{{ projectInfo?.project_id }}</div>
						</div>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">项目图标</div>
							<div class="label description">
								<img v-if="projectInfo?.project_img" :src="projectInfo.project_img" alt="" style="width: 50px; border-radius: 4px" />
								<!-- <img v-if="!projectInfo?.project_img" style="width: 40px; border-radius: 6px" src="../../../static/projectIcons/12.jpg" /> -->
							</div>
						</div>
					</div>
					<div v-if="canModifyProjectInfo">
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="uploadIcon">上传图标</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">项目简介</div>
							<div class="label description">{{ projectInfo?.project_desc ?? '' }}</div>
						</div>
					</div>
					<div v-if="canModifyProjectInfo">
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeTeamDesc">编 辑</el-button>
					</div>
				</div>
				<!-- <el-divider />
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
				</div> -->
			</div>
			<!-- <div class="container">
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
			</div> -->
			<div></div>
		</div>
		<div v-if="canDeletePro" class="container">
			<div class="container-header warning">
				<el-icon size="15"><WarnTriangleFilled /></el-icon>危险区域
			</div>
			<div class="content warning-content">
				<!-- <div class="list">
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
				<el-divider /> -->
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">删除项目</div>
							<div class="label description">务必谨慎，删除后项目不可以找回</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" style="color: red" @click="handleDeleteTeam">删 除</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- </div> -->
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getProjectBasicInfo, updateProjectBasicInfo, deleteProject, uploadProjectIcon } from '../../../api/projects';
import { useBaseStore } from '../../../store/index';
import { ElNotification } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';

import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import { Picture as IconPicture } from '@element-plus/icons-vue';

import { ProjectRole } from '@/utils/projectPermission';

interface ProjectInfo {
	project_current_type?: number;
	project_desc?: string;
	project_id?: number;
	project_img?: string;
	project_name?: string;
	team_id?: number;
}

const baseStore = useBaseStore();
const router = useRouter();
const route = useRoute();

const deleteTeamDialog = ref(false);
const moveToOtherTeamDialog = ref(false);
const changeTeamNameDialog = ref(false);
const changeTeamDescDialog = ref(false);
const uploadIconDialog = ref(false);

let projectInfo = reactive<ProjectInfo>({});
let projectName = ref(projectInfo.project_name);
let projectDesc = ref(projectInfo.project_desc);

const printTeamName = ref('');
const receiver = ref('');
const receivers = reactive([]);

const fileRef = ref<HTMLInputElement>();
const uploadIconFile = ref();
let sourceFile: File | null | undefined = null;
// let sourceFileURL = ref('');
let windowShowList = ref<boolean[]>([false]);

let sourceFileURL: string = '';
let croppedFile: File | null | undefined = null;
let croppedFileURL = ref<string>('');
let croppedFileType: string = ''; // 裁剪后的文件类型

interface RuleForm {
	name: string;
}

const canDeletePro = computed(() => {
	// const roleList: any = baseStore.projectRoleList;
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] === ProjectRole.ADMIN;
});
const canModifyProjectInfo = computed(() => {
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] !== ProjectRole.READ_ONLY;
});

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
	// projectInfo = storeToRefs(baseStore).curProjectInfo;
	const res = await getProjectBasicInfo({
		project_id: baseStore.curProjectInfo.project_id!,
	});
	console.log('res282:', res);
	// projectInfo = { ...res.data.project_info };
	const resData = res.data.project_info;
	projectInfo.project_current_type = resData.project_current_type;
	projectInfo.project_desc = resData.project_desc;
	projectInfo.project_id = resData.project_id;
	projectInfo.project_img = resData.project_img;
	projectInfo.project_name = resData.project_name;

	console.log('projectInfo', projectInfo);
	projectDesc.value = projectInfo?.project_desc ?? '';
	projectName.value = projectInfo?.project_name ?? '';
};

// 修改项目名称
const changeTeamName = () => {
	changeTeamNameDialog.value = true;
};
// 确认修改项目名称
const confirmChangeProjectName = async () => {
	changeTeamNameDialog.value = false;
	await updateProjectBasicInfo({ project_id: baseStore.curProjectInfo.project_id!, project_name: projectName.value });
	await getProjectInfos();
	projectName.value = projectInfo!.project_name!;
};
// 修改团队描述;
const changeTeamDesc = () => {
	changeTeamDescDialog.value = true;
};
const confirmChangeProjectDesc = async () => {
	changeTeamDescDialog.value = false;
	console.log(projectDesc.value);
	await updateProjectBasicInfo({ project_id: baseStore.curProjectInfo.project_id!, project_desc: projectDesc.value });
	await getProjectInfos();
	console.log('projectInfo', projectInfo);
	projectDesc.value = projectInfo.project_desc!;
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
const confirmDelete = async () => {
	// console.log(baseStore.curProjectInfo.project_name);
	if (printTeamName.value === projectInfo.project_name) {
		deleteTeamDialog.value = false;
		await deleteProject({ project_id: baseStore.curProjectInfo.project_id! });
		router.push('/main');
	} else {
		ElMessage.error('项目名输入错误');
	}
};

// 直接点击el-dialog的叉叉关闭
const handleClose = (done: () => void) => {
	ElMessageBox.confirm('确定放弃修改吗？').then(() => {
		sourceFile = null;
		done();
	});
};

// 上传项目图标
const uploadIcon = () => {
	uploadIconDialog.value = true;
};

// 点击上传文件
const uploadFile = () => {
	fileRef.value?.click();
};

// 监听文件变化
const fileChange = () => {
	// windowShowList.value[0] = true;
	sourceFile = fileRef.value?.files?.[0] || null;
	croppedFileType = sourceFile?.type ?? '';
	if (sourceFile != null) {
		windowShowList.value[0] = true;
		sourceFileURL = URL.createObjectURL(sourceFile as Blob);
	}
};
// 确认裁剪
const confirmCropper = async () => {
	windowShowList.value[0] = false;
	uploadIconDialog.value = false;
	sourceFileURL = '';

	croppedFile = await cropper?.getFile();

	let Blob = (await cropper?.getBlob()) as Blob;

	// 把blob转换成file，type为croppedFileType
	const uploadFile = new File([Blob], croppedFile?.name + 'jpeg' ?? '1.jpeg', { type: croppedFileType, lastModified: croppedFile?.lastModified });

	if (croppedFile) {
		croppedFileURL.value = URL.createObjectURL(croppedFile as Blob);
		const res = await uploadProjectIcon({ projectIcon: uploadFile });
		baseStore.setCurProjectInfo({
			project_id: projectInfo.project_id,
			project_img: res.data.project_icon_path,
			project_name: projectInfo.project_name!,
		});
		projectInfo.project_img = res.data.project_icon_path;

		await updateProjectBasicInfo({ project_id: baseStore.curProjectInfo.project_id!, project_img: res.data.project_icon_path });
		sourceFile = null;
	}
};

// const confirmUploadIcon = async () => {
// 	uploadIconDialog.value = false;
// 	sourceFileURL = '';
// 	// console.log('icon', sourceFile);
// 	if (sourceFile) {
// 		const res = await uploadProjectIcon({ projectIcon: sourceFile });
// 		// console.log('res1:', res);
// 		baseStore.setCurProjectInfo({
// 			project_id: projectInfo.project_id,
// 			project_img: res.data.project_icon_path,
// 			project_name: projectInfo.project_name!,
// 		});
// 		projectInfo.project_img = res.data.project_icon_path;

// 		await updateProjectBasicInfo({ project_id: baseStore.curProjectInfo.project_id!, project_img: res.data.project_icon_path });
// 		sourceFile = null;
// 	} else {
// 		ElNotification({
// 			title: '上传失败',
// 			message: '请选择图标',
// 			type: 'warning',
// 		});
// 	}
// };

// 监听窗口关闭，清除图片裁剪的缓存
watch(
	() => windowShowList.value[0],
	(newV, _) => {
		if (!newV) {
			sourceFile = null;
			sourceFileURL = '';
			croppedFile = null;
			croppedFileURL.value = '';
		}
	}
);

onMounted(async () => {
	baseStore.curProjectInfo.project_id = parseInt(route.params.project_id as string);
	await getProjectInfos();
	console.log(projectInfo);
});
</script>

<style scoped lang="less">
.setting-wrap {
	width: 90%;
	margin-left: 0px;

	.header {
		height: 80px;
		font-size: 24px;
		margin-top: 40px;
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
							// flex: 0.5;
							width: 300px;
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
.uploadBtn {
	margin: auto;
	margin-bottom: 40px;
	width: 100px;
	font-size: 16px;
	border-radius: 4px;
	border: 1px solid #cdcccc;
	text-align: center;
}
.uploadBtn:hover {
	border: 1px solid #ac97ec;
	color: #d0c4f5;
}
</style>
