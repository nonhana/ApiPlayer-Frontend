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
				<el-button type="default" size="large" auto-insert-space @click="changeTeamName">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmChangeTeamName">保 存</el-button>
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
	<el-dialog v-model="changeTeamDialog" title="移交团队" width="25%">
		<template #header>
			<div class="dialog-title">移交团队</div>
		</template>
		<div class="input-label">接收人</div>
		<el-select v-model="receiver" placeholder="" class="select">
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
		<el-input v-model="printTeamName" placeholder="" autocomplete="off" size="large" />
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
				<div class="list">
					<div class="left">
						<div class="left-content">
							<div class="label title">团队名称</div>
							<div class="label description">个人空间</div>
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
							<div class="label title">我的团队内昵称</div>
							<div class="label description">G4S</div>
						</div>
					</div>
					<div>
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="changeMyName">编 辑</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="container-header">危险区域</div>
			<div class="content">
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
						<el-button color="rgba(16, 24, 40, 0.04)" size="large" plain class="button" @click="deleteTeam">解 散</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
const deleteTeamDialog = ref(false);
const changeTeamDialog = ref(false);
const changeTeamNameDialog = ref(false);
const changeMyNameDialog = ref(false);
const teamName = ref('个人空间');
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
const changeTeamName = () => {
	changeTeamNameDialog.value = true;
};
const confirmChangeTeamName = () => {
	changeTeamNameDialog.value = false;
};
const changeMyName = () => {
	changeMyNameDialog.value = true;
};
const confirmChangeMyName = () => {
	changeMyNameDialog.value = false;
};
const changeLeader = () => {
	changeTeamDialog.value = true;
};
const confirmChangeLeader = () => {
	changeTeamDialog.value = false;
};
const deleteTeam = () => {
	deleteTeamDialog.value = true;
};
const confirmDelete = () => {
	deleteTeamDialog.value = false;
};
</script>

<style scoped lang="less">
.setting-wrap {
	.container {
		margin-bottom: 40px;
		.container-header {
			font-weight: 500;
			font-size: 16px;
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
