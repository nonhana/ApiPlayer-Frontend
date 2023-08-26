<template>
	<el-dialog v-model="changeTeamNameDialog" title="修改团队" width="28%">
		<template #header>
			<div class="dialog-title">团队名称</div>
		</template>
		<el-form ref="teamFormRef" :model="teamForm" :rules="teamRules" status-icon label-position="top" label-width="100px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="teamName" placeholder="" autocomplete="off" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeTeamNameDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeTeamName">保 存</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="changeTeamDescDialog" title="修改团队描述" width="28%">
		<template #header>
			<div class="dialog-title">团队描述</div>
		</template>
		<el-form ref="teamFormRef" :model="teamForm" :rules="teamRules" status-icon label-position="top" label-width="100px">
			<el-form-item label="描述" prop="name">
				<el-input v-model="teamDesc" placeholder="" autocomplete="off" size="large" />
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
				<el-input v-model="myName" autocomplete="off" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeMyNameDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeMyName">确定</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="changeTeamDialog" title="移交团队" width="25%">
		<template #header>
			<div class="dialog-title">移交团队</div>
		</template>
		<div class="input-label">接收人</div>
		<el-select v-model="receiver" placeholder="请选择要移交的对象" class="select">
			<el-option v-for="item in receivers" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="changeTeamDialog = false">取 消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeLeader">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="deleteTeamDialog" title="解散团队?" width="33%">
		<template #header>
			<div class="dialog-title">修改名称</div>
		</template>
		<div class="alert">
			解散<strong>{{ teamName }}</strong>
			团队后，该团队下的所有项目都将被同步删除，且不可恢复！
		</div>
		<div class="input-label">请输入团队名确定操作</div>
		<el-input v-model="confrimTeamName" placeholder="" autocomplete="off" size="large" />
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" auto-insert-space @click="deleteTeamDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmDelete">
					我已了解后果，确定解散
				</el-button>
			</span>
		</template>
	</el-dialog>
	<div class="setting-wrap">
		<div class="container">
			<div class="container-header">基础信息</div>
			<div class="content">
				<template v-if="baseStore.inviteMemberBtnVisible">
					<div class="list">
						<div class="left">
							<div class="left-content">
								<div class="label title">团队名称</div>
								<div class="label description">{{ teamName }}</div>
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
								<div class="label title">团队描述</div>
								<div class="label description">{{ teamDesc }}</div>
							</div>
						</div>
						<div>
							<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeTeamDesc">编 辑</el-button>
						</div>
					</div>
					<el-divider />
				</template>
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">我的团队内昵称</div>
							<div class="label description">{{ myName }}</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeMyName">编 辑</el-button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="baseStore.disbandBtnVisible" class="container">
			<div class="container-header warning">
				<el-icon size="15"><WarnTriangleFilled /></el-icon>危险区域
			</div>
			<div class="content warning-content">
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">移交</div>
							<div class="label description">将团队的所有者权限移交给其他成员</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeLeader">移 交</el-button>
					</div>
				</div>
				<el-divider />
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">解散</div>
							<div class="label description">务必谨慎，解散后无法找回</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="handleDeleteTeam">解 散</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { updateTeam, deleteTeam, setMemberIdentity } from '@/api/teams';
import { useBaseStore } from '@/store';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

interface RuleForm {
	name: string;
}

const route = useRoute();
const baseStore = useBaseStore();
const deleteTeamDialog = ref<boolean>(false);
const changeTeamDialog = ref<boolean>(false);
const changeTeamNameDialog = ref<boolean>(false);
const changeTeamDescDialog = ref<boolean>(false);
const changeMyNameDialog = ref<boolean>(false);
const teamName = ref<string>('');
const teamDesc = ref<string>('');
const myName = ref<string>('');
const confrimTeamName = ref<string>('');
const receiver = ref<string>('');
const receivers = ref<any[]>([]);
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

const changeTeamName = () => {
	changeTeamNameDialog.value = true;
};
const confirmChangeTeamName = async () => {
	await updateTeam({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: baseStore.user_info.user_id,
		team_name: teamName.value,
	});
	await baseStore.getTeamInfo(Number(route.params.team_id));
	changeTeamNameDialog.value = false;
};
const changeTeamDesc = () => {
	changeTeamDescDialog.value = true;
};
const confirmChangeTeamDesc = async () => {
	await updateTeam({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: baseStore.user_info.user_id,
		team_desc: teamDesc.value,
	});
	await baseStore.getTeamInfo(Number(route.params.team_id));
	changeTeamDescDialog.value = false;
};
const changeMyName = () => {
	changeMyNameDialog.value = true;
};
const confirmChangeMyName = async () => {
	await updateTeam({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: baseStore.user_info.user_id,
		team_user_name: myName.value,
	});
	await baseStore.getTeamInfo(Number(route.params.team_id));
	changeMyNameDialog.value = false;
};
const changeLeader = async () => {
	// 获取到除自己之外的团队成员
	receivers.value = baseStore.teamDetailedInfo.member_list
		.filter((item) => item.user_id !== baseStore.user_info.user_id)
		.map((item) => {
			return {
				label: item.user_name,
				value: item.user_name,
			};
		});
	changeTeamDialog.value = true;
};
const confirmChangeLeader = async () => {
	// 获取到接收人的user_id
	const receiverId = baseStore.teamDetailedInfo.member_list.find((item) => item.user_name === receiver.value)?.user_id;
	// 把自己的身份变为团队管理员，把接收人的身份变为团队所有者
	await setMemberIdentity({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: baseStore.user_info.user_id,
		team_user_identity: 1,
	});
	await setMemberIdentity({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: receiverId as number,
		team_user_identity: 0,
	});
	// 提交完成后，刷新数据
	ElMessage.success('移交成功');
	await baseStore.getTeamInfo(Number(route.params.team_id));
	window.location.reload();
	changeTeamDialog.value = false;
};
const handleDeleteTeam = () => {
	deleteTeamDialog.value = true;
};
const confirmDelete = async () => {
	// 先验证输入的团队名是否正确
	if (confrimTeamName.value !== baseStore.teamDetailedInfo.team_info.team_name) {
		ElMessage.error('团队名不正确');
		return;
	}
	// 确认解散团队
	const res = await deleteTeam({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
	});
	if (res.data.result_code === 0) {
		ElMessage.success('解散成功');
		window.location.href = '/';
		deleteTeamDialog.value = false;
	} else {
		ElMessage.error('解散失败');
	}
};

watch(
	() => baseStore.teamDetailedInfo,
	() => {
		teamName.value = baseStore.teamDetailedInfo.team_info.team_name;
		teamDesc.value = baseStore.teamDetailedInfo.team_info.team_desc ?? '';
		myName.value = baseStore.teamDetailedInfo.member_list.find((item) => item.user_id === baseStore.user_info.user_id)?.user_team_name ?? '';
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.setting-wrap {
	.container {
		margin-bottom: 40px;
		.container-header {
			font-weight: 500;
			font-size: 16px;
		}

		.warning {
			color: #e5bf28;
		}

		.content {
			padding: 12px;
			border: 1px solid #f3f5f6;
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
