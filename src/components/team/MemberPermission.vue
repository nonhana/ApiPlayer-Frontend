<template>
	<div class="dialog-div">
		<el-dialog v-model="inviteDialog" title="邀请成员" width="400px">
			<template #header>
				<div class="dialog-title">邀请加入 {{ baseStore.teamDetailedInfo.team_info.team_name }}</div>
			</template>
			<el-form ref="inviteFormRef" :model="inviteForm" :rules="inviteFormRules" status-icon label-position="left" label-width="120px">
				<el-form-item label="搜索用户" label-width="80">
					<el-input v-model="inviteForm.username" placeholder="用户名" class="input-with-select">
						<template #append>
							<el-button :icon="Search" @click="search" />
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="" label-width="0">
					<el-table :data="inviteForm.searchUserData" style="width: 100%" border>
						<el-table-column prop="avatar" label="昵称" width="100">
							<template #default="scope">
								<div class="name-column">
									<el-avatar :size="30" shape="square" :src="scope.row.avatar" />
									<span class="row-name">{{ scope.row.name }}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="email" label="邮箱" width="150" />
						<el-table-column align="center">
							<template #default="scope">
								<el-button type="primary" size="default" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmInvite(scope.row)">
									邀请
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>

	<el-dialog v-model="settingDialog" title="设置成员权限" width="400px">
		<template #header>
			<div class="dialog-title">设置成员权限</div>
		</template>
		<div class="user-info">
			<div class="avatar">
				<el-avatar :size="40" :src="user.avatar" />
			</div>
			<div class="info">
				<div class="username">{{ user.name }}</div>
				<div class="email">邮箱：{{ user.email }}</div>
			</div>
		</div>
		<el-form ref="settingFormRef" :model="user" :rules="settingFormRules" status-icon label-position="top" label-width="120px">
			<el-form-item label="团队内昵称" label-width="0">
				<el-input v-model="user.team_name" placeholder="请输入ta团队内的昵称" class="input-with-select" />
			</el-form-item>
			<el-form-item label="团队权限" prop="ability">
				<el-select v-model="user.tag" placeholder="请选择ta的团队权限" class="select">
					<el-option v-for="item in teamIdentities" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="项目权限" prop="projectAbility">
				<el-table :data="user.projectAbility" style="width: 100%" border>
					<el-table-column prop="project" label="项目" width="200px">
						<template #default="scope">
							<div class="name-column">
								<el-avatar :size="30" shape="square" :src="scope.row.image" />
								<span class="row-name">{{ scope.row.title }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="ability" label="权限">
						<template #default="scope">
							<el-select v-model="scope.row.ability" placeholder="" class="select">
								<el-option v-for="item in projectIdentities" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button
					v-if="user.id !== baseStore.user_info.user_id"
					type="default"
					size="large"
					plain
					color="rgb(255, 77, 79)"
					auto-insert-space
					class="change-btn"
					@click="handleRemoveMember"
				>
					移除成员
				</el-button>
				<el-button type="default" size="large" auto-insert-space @click="settingDialog = false">取消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmSetting">保存</el-button>
			</span>
		</template>
	</el-dialog>

	<div class="MemberPermission-wrap">
		<div class="statistic">
			<div class="statistic-item">
				<el-statistic title="团队管理者" :value="adminNum" />
			</div>
			<div class="statistic-item">
				<el-statistic title="团队成员" :value="memberNum" />
			</div>
			<div class="statistic-item">
				<el-statistic title="游客" :value="guestNum">
					<template #title>
						<div>
							游客
							<el-tooltip content="游客只能访问与其明确共享的项目" placement="top">
								<el-icon class="pointer"><QuestionFilled /></el-icon>
							</el-tooltip>
						</div>
					</template>
				</el-statistic>
			</div>
		</div>
		<div class="search-invite">
			<div class="search">
				<el-input v-model="searchContent" class="w-50 m-2" size="large" placeholder="搜索" :prefix-icon="Search" />
			</div>
			<div v-if="baseStore.inviteMemberBtnVisible" class="invite">
				<el-button type="primary" :icon="CirclePlusFilled" color="#59A8B9" class="invite-btn" @click="inviteMember">邀请成员</el-button>
			</div>
		</div>
		<div class="table">
			<el-table
				:data="baseStore.teamDetailedInfo.member_list"
				style="width: 100%"
				:header-cell-style="{ fontWeight: '500', color: '#606266' }"
				:row-style="{ height: '70px' }"
			>
				<el-table-column label="昵称" width="250">
					<template #default="scope">
						<div class="name-column">
							<el-avatar :size="30" :src="scope.row.user_img" />
							<span class="row-name">{{ scope.row.user_team_name }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="user_email" label="邮箱" width="350" />
				<el-table-column label="团队权限" width="250" :filters="filters" :filter-method="filterTag" filter-placement="right">
					<template #default="scope">
						<el-tag :type="colorMap.get(identityMap.get(scope.row.user_identity))">{{ identityMap.get(scope.row.user_identity) }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column v-if="baseStore.inviteMemberBtnVisible">
					<template #default="scope">
						<el-icon class="pointer" @click="openMemSetting(scope.row)"><Setting /></el-icon>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { Search, CirclePlusFilled } from '@element-plus/icons-vue';
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus';
import { inviteUser, setMemberIdentity, removeMember } from '@/api/teams';
import type { TeamIdentity } from '@/api/teams';
import { searchUser } from '@/api/users';
import { useBaseStore } from '@/store';
import { useRoute } from 'vue-router';
import { ProjectRole } from '@/utils/projectPermission';

interface User {
	id: number;
	avatar: string;
	email: string;
	name: string;
	team_name: string;
	tag: string;
	projectAbility: {
		image: string;
		title: string;
		ability: string;
	}[];
}
interface RuleForm {
	username: string;
	searchUserData: User[];
}

const route = useRoute();
const baseStore = useBaseStore();

// const canModifyMemberPermission = computed(() => {
// 	return (
// 		baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] === ProjectRole.ADMIN ||
// 		baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] === ProjectRole.EDITOR
// 	);
// });

// 初始化user
const user = ref<User>({
	id: 0,
	avatar: '',
	email: '',
	name: '',
	team_name: '',
	tag: '',
	projectAbility: [],
});
const colorMap = new Map().set('团队所有者', 'danger').set('团队管理者', 'warning').set('团队成员', 'success').set('游客', 'info');
const identityMap = new Map().set(0, '团队所有者').set(1, '团队管理者').set(2, '团队成员').set(3, '游客');
const identityMapReverse = new Map().set('团队所有者', 0).set('团队管理者', 1).set('团队成员', 2).set('游客', 3);
const projectMap = new Map().set(0, '管理员').set(1, '编辑者').set(2, '只读成员').set(3, '禁止访问');
const projectMapReverse = new Map().set('管理员', 0).set('编辑者', 1).set('只读成员', 2).set('禁止访问', 3);
const inviteDialog = ref<boolean>(false);
const inviteFormRef = ref<FormInstance>();
const inviteForm = reactive<RuleForm>({
	username: '',
	searchUserData: [],
});
const inviteFormRules = reactive<FormRules<RuleForm>>({
	username: [{ required: true, message: '请选择用户名', trigger: 'blur' }],
});
const settingDialog = ref<boolean>(false);
const settingFormRef = ref<FormInstance>();
const settingFormRules = reactive<FormRules<User>>({
	tag: [{ required: true, message: '请选择所有权限', trigger: 'blur' }],
});
// 项目权限列表:0-管理员，1-编辑者，2-只读成员，3-禁止访问
const projectIdentities = [
	{
		value: '管理员',
		label: '管理员',
	},
	{
		value: '编辑者',
		label: '编辑者',
	},
	{
		value: '只读成员',
		label: '只读成员',
	},
	{
		value: '禁止访问',
		label: '禁止访问',
	},
];
// 团队权限列表:0-团队所有者，1-团队管理者，2-团队成员，3-游客
const teamIdentities = [
	{
		value: '团队所有者',
		label: '团队所有者',
	},
	{
		value: '团队管理者',
		label: '团队管理者',
	},
	{
		value: '团队成员',
		label: '团队成员',
	},
	{
		value: '游客',
		label: '游客',
	},
];
const searchContent = ref<string>('');
const filters = [
	{ text: '团队所有者', value: '团队所有者' },
	{ text: '团队管理者', value: '团队管理者' },
	{ text: '团队成员', value: '团队成员' },
	{ text: '游客', value: '游客' },
];

const adminNum = computed(() => countUsersByRole('团队管理者'));
const memberNum = computed(() => countUsersByRole('团队成员'));
const guestNum = computed(() => countUsersByRole('游客'));

const countUsersByRole = (role: string): number => {
	const users = baseStore.teamDetailedInfo.member_list;
	return users.filter((user) => user.user_identity === identityMapReverse.get(role)).length;
};
const inviteMember = () => {
	inviteDialog.value = true;
};
const confirmInvite = async (user: any) => {
	await inviteUser({
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: user.user_id,
		team_user_name: user.user_name, // 默认是用户的用户名
	});
	await baseStore.getTeamInfo(Number(route.params.team_id));
	inviteDialog.value = false;
};
// 搜索用户
const search = () => {
	searchUser({ username: inviteForm.username }).then(async (res) => {
		if (res.data) {
			// 过滤掉已经在团队中的用户
			const teamUserIds = baseStore.teamDetailedInfo.member_list.map((item) => item.user_id);
			inviteForm.searchUserData = res.data.user_list.filter((item: any) => !teamUserIds.includes(item.user_id));
		}
	});
};
// 打开设置成员dialog并获取数据
const openMemSetting = (row: any) => {
	settingDialog.value = true;
	user.value.id = row.user_id;
	user.value.name = row.user_name;
	user.value.team_name = row.user_team_name;
	user.value.avatar = row.user_img;
	user.value.email = row.user_email;
	user.value.tag = identityMap.get(row.user_identity);
	// 拿到项目权限
	let projectAbility: {
		image: string;
		title: string;
		ability: string;
	}[] = [];
	baseStore.teamDetailedInfo.project_list.forEach((item) => {
		const index = item.project_member_list.findIndex((member) => member.user_id === row.user_id);
		if (index !== -1) {
			projectAbility.push({
				image: item.project_img,
				title: item.project_name,
				ability: projectMap.get(item.project_member_list[index].user_identity),
			});
		}
	});
	user.value.projectAbility = projectAbility;
};
// 确认修改成员权限
const confirmSetting = async () => {
	// 将user中的数据进行处理，转化成接口需要的数据格式
	const data: TeamIdentity = {
		team_id: baseStore.teamDetailedInfo.team_info.team_id,
		user_id: user.value.id,
		team_user_name: user.value.team_name,
		team_user_identity: identityMapReverse.get(user.value.tag),
		team_project_indentity_list: user.value.projectAbility
			? user.value.projectAbility.map((item) => {
					return {
						project_id: baseStore.teamDetailedInfo.project_list.find((project) => project.project_name === item.title)!.project_id,
						project_user_identity: projectMapReverse.get(item.ability),
					};
			  })
			: [],
	};
	await setMemberIdentity(data);
	// 提交完成后，刷新数据
	await baseStore.getTeamInfo(Number(route.params.team_id));
	settingDialog.value = false;
};
const filterTag = (value: string, row: any) => {
	return row.user_identity === identityMapReverse.get(value);
};
const handleRemoveMember = () => {
	ElMessageBox.confirm('确定移除成员：' + user.value.name + ' 吗？', '提醒', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await removeMember({
				team_id: baseStore.teamDetailedInfo.team_info.team_id,
				user_id: user.value.id,
			});
			await baseStore.getTeamInfo(Number(route.params.team_id));
			settingDialog.value = false;
			ElMessage({
				type: 'success',
				message: '移除成功',
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消移除',
			});
		});
};

watch(settingDialog, (newV, _) => {
	if (!newV) {
		// 关闭dialog时，清空数据
		user.value = {
			id: 0,
			avatar: '',
			email: '',
			name: '',
			team_name: '',
			tag: '',
			projectAbility: [],
		};
	}
});
watch(inviteDialog, (newV, _) => {
	if (!newV) {
		// 关闭dialog时，清空数据
		inviteForm.username = '';
		inviteForm.searchUserData = [];
	}
});
</script>

<style scoped lang="less">
.MemberPermission-wrap {
	.statistic {
		height: 120px;
		display: flex;
		padding: 12px 24px;
		margin-bottom: 24px;
		justify-content: center;
		align-items: center;
		background-color: #faf9fb;
		border-radius: 8px;
		.statistic-item {
			flex: 1;
			display: flex;
			justify-content: center;
		}
	}
	.search-invite {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		.invite {
			.invite-btn {
				color: #fff;
				font-size: 14px;
			}
		}
	}
	.table {
		padding: 20px;
		border: 1px solid #f2f4f7;
		border-radius: 8px;
		.pointer {
			cursor: pointer;
		}
	}
}

.user-info {
	display: flex;
	gap: 10px;
	padding: 0 8px 16px 16px;
	border-bottom: 1px solid #f2f4f7;
	margin-bottom: 20px;
	.avatar {
		width: 40px;
		height: 40px;
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		.username {
			color: rgba(16, 24, 40, 0.8);
			font-weight: 500;
			font-size: 14px;
		}
		.email {
			color: rgba(16, 24, 40, 0.56);
			font-size: 12px;
		}
	}
}

.dialog-div {
	max-height: 500px;
}

.select {
	width: 100%;
}

.dialog-btn {
	color: #fff;
	font-size: 14px;
}

.change-btn {
	float: left;
}

.name-column {
	display: flex;
	gap: 6px;
	align-items: center;
}
.row-name {
	font-size: 14px;
	font-weight: 400;
}

:deep(.el-statistic) {
	display: flex;
	flex-direction: column;
	align-items: center;
}
:deep(.el-statistic__head) {
	font-weight: 600;
	font-size: 16px;
}
:deep(.el-statistic__content) {
	font-weight: 600;
	font-size: 38px;
}
</style>
