<template>
	<div class="team-wrap">
		<div class="team-header">
			<div class="team-name">{{ baseStore.teamDetailedInfo.team_info.team_name }}</div>
			<div>
				<el-tag :type="colorMap.get(baseStore.teamIdentity)">{{ identityMap.get(baseStore.teamIdentity) }}</el-tag>
			</div>
		</div>

		<div class="team-middle">
			<div class="tabs">
				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane label="项目列表" name="first">
						<ProjectList v-if="baseStore.projectRoleList" />
					</el-tab-pane>
					<template v-if="baseStore.teamSettingBtnVisible">
						<el-tab-pane label="成员/权限" name="second">
							<MemberPermission />
						</el-tab-pane>
						<el-tab-pane label="团队设置" name="third">
							<TeamSetting />
						</el-tab-pane>
					</template>
				</el-tabs>
			</div>
			<div v-if="isShowMiddleRight" class="middle-right">
				<div>
					<el-input v-model="searchContent" class="w-50 m-2" placeholder="搜索" :prefix-icon="Search" />
				</div>
				<div>
					<el-button
						v-if="baseStore.inviteMemberBtnVisible"
						type="primary"
						color="#59A8B9"
						auto-insert-space
						:icon="Plus"
						class="create-btn"
						@click="createProject"
						>新建项目</el-button
					>
				</div>
			</div>
		</div>

		<el-dialog v-model="addProjectDialog" title="新建项目" width="400px" center>
			<template #header>
				<h1>新建项目</h1>
			</template>
			<el-form label-position="top" label-width="100px" :model="addProjectForm" style="max-width: 460px">
				<el-form-item label="项目名称">
					<el-input v-model="addProjectForm.project_name" />
				</el-form-item>
				<el-form-item label="项目图标">
					<div class="project-icon" @mouseenter="showTemplate = true" @mouseleave="showTemplate = false">
						<div class="template" @click="uploadFile">
							<span>点击上传项目图标图片</span>
						</div>
						<input v-show="false" ref="fileRef" type="file" @change="fileChange" />
						<el-image :src="addProjectForm!.project_img">
							<template #error>
								<div
									class="image-slot"
									style="
										display: flex;
										justify-content: center;
										align-items: center;
										width: 200px;
										height: 200px;
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
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmCreate">新 建</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="cutImgDialog" title="图片裁剪" width="800px" :before-close="handleClose">
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
					<el-button @click="cutImgDialog = false">取消</el-button>
					<el-button color="#59A8B9" @click="confirmCropper"><span style="color: #fff">确认</span></el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';
import ProjectList from '@/components/team/ProjectList.vue';
import MemberPermission from '@/components/team/MemberPermission.vue';
import TeamSetting from '@/components/team/TeamSetting.vue';
import { useRoute } from 'vue-router';
import { addProject, uploadProjectIcon } from '@/api/projects';
import { useBaseStore } from '@/store/index';
import type { TabsPaneContext } from 'element-plus';
import { Search, Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import { ProjectRole } from '@/utils/projectPermission';

// 获取文件上传的input元素
const fileRef = ref<HTMLInputElement>();

const baseStore = useBaseStore();

const route = useRoute();
const colorMap = new Map().set(0, 'danger').set(1, 'warning').set(2, 'success').set(3, 'info');
const identityMap = new Map().set(0, '团队所有者').set(1, '团队管理者').set(2, '团队成员').set(3, '游客');
const activeName = ref<string>('first');
const searchContent = ref<string>('');
const addProjectDialog = ref<boolean>(false);
const isShowMiddleRight = ref<boolean>(true);
const cutImgDialog = ref<boolean>(false);
const showTemplate = ref<boolean>(false);
interface AddProjectForm {
	user_id: number;
	team_id: number;
	project_name: string;
	project_img: string;
}
const addProjectForm = ref<AddProjectForm>({
	user_id: 0,
	team_id: 0,
	project_name: '',
	project_img: '',
});

let sourceFile: File | null | undefined = null;
let sourceFileURL: string = '';
let croppedFile: File | null | undefined = null;
let croppedFileURL = ref<string>('');
let croppedFileType: string = ''; // 裁剪后的文件类型

// 直接点击el-dialog的叉叉关闭
const handleClose = (done: () => void) => {
	ElMessageBox.confirm('确定放弃修改吗？').then(() => {
		done();
	});
};
const handleClick = (tab: TabsPaneContext) => {
	if (tab.paneName === 'first') {
		isShowMiddleRight.value = true;
	} else if (tab.paneName == 'second' || tab.paneName == 'third') {
		isShowMiddleRight.value = false;
	}
};
const createProject = () => {
	addProjectDialog.value = true;
	addProjectForm.value = {
		user_id: baseStore.user_info.user_id,
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		project_name: '',
		project_img: '',
	};
};
const confirmCreate = async () => {
	const res = await addProject(addProjectForm.value);
	if (res.data.result_code === 0) {
		await baseStore.getTeamInfo(Number(route.params.team_id));
		ElMessage.success('新建项目成功');
	} else {
		ElMessage.error('新建项目失败');
	}
	addProjectDialog.value = false;
};
// 监听文件变化
const fileChange = () => {
	sourceFile = fileRef.value?.files?.[0] || null;
	croppedFileType = sourceFile?.type ?? '';
	if (sourceFile != null) {
		cutImgDialog.value = true;
		sourceFileURL = URL.createObjectURL(sourceFile as Blob);
	}
};
// 点击上传文件
const uploadFile = () => {
	fileRef.value?.click();
};
// 确认裁剪
const confirmCropper = async () => {
	cutImgDialog.value = false;
	croppedFile = await cropper?.getFile();

	let Blob = (await cropper?.getBlob()) as Blob;

	// 把blob转换成file，type为croppedFileType
	const uploadFile = new File([Blob], croppedFile?.name + 'jpeg' ?? '1.jpeg', { type: croppedFileType, lastModified: croppedFile?.lastModified });

	if (croppedFile) {
		croppedFileURL.value = URL.createObjectURL(croppedFile as Blob);
		const res = await uploadProjectIcon({ projectIcon: uploadFile });
		if (res.data.result_code === 0) {
			addProjectForm.value.project_img = res.data.project_icon_path;
		} else {
			ElMessage.error('上传失败');
		}
	}
};

watch(
	() => route.params.team_id,
	async (newV, _) => {
		if (newV) {
			await baseStore.getTeamInfo(Number(newV));

			let projectRoleList: any = {};
			for (let item of baseStore.teamDetailedInfo.project_list) {
				const identity: ProjectRole = item.project_member_list.filter((it) => {
					return it.user_id === baseStore.user_info.user_id;
				})[0].user_identity;

				projectRoleList[item.project_id] = identity;
			}
			baseStore.setProjectRoleList(projectRoleList);
			console.log('proRole', baseStore.projectRoleList);
		}
	},
	{ immediate: true, deep: true }
);

onBeforeMount(async () => {
	await baseStore.getTeamInfo(Number(route.params.team_id));
});
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

.project-icon {
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	cursor: pointer;
	img {
		width: 200px;
	}
	.template {
		position: absolute;
		width: 200px;
		height: 200px;
		background: rgba(0, 0, 0, 0.25);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		span {
			font-family: Microsoft YaHei;
			font-size: 14px;
			font-weight: normal;
			color: #ffffff;
		}
		z-index: 10;
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
