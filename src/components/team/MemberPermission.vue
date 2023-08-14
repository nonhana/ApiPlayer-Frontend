<template>
	<el-dialog v-model="inviteDialog" title="邀请成员" width="28%">
		<template #header>
			<div class="dialog-title">邀请加入 {{ teamName }}</div>
		</template>
		<el-form ref="inviteFormRef" :model="inviteForm" :rules="inviteFormRules" status-icon label-position="left" label-width="120px">
			<el-form-item label="" label-width="0">
				<el-input v-model="inviteForm.link" disabled placeholder="" class="input-with-select">
					<template #append>
						<el-button :icon="Refresh" />
					</template>
				</el-input>
				<div class="alert">邀请将在 7 天后过期</div>
			</el-form-item>
			<el-form-item label="所有项目权限" prop="ability">
				<el-select v-model="inviteForm.ability" placeholder="" class="select">
					<el-option v-for="item in abilities" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn btn-width" @click="confirmInvite">
					复制链接
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="settingDialog" title="设置成员权限" width="35%">
		<template #header>
			<div class="dialog-title">设置成员权限</div>
		</template>
		<div class="user-info">
			<div class="avatar">
				<el-avatar :size="40" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
			</div>
			<div class="info">
				<div class="username">{{ user.name }}</div>
				<div class="email">邮箱：{{ user.email }}</div>
			</div>
		</div>
		<el-form ref="settingFormRef" :model="user" :rules="settingFormRules" status-icon label-position="top" label-width="120px">
			<el-form-item label="团队内昵称" label-width="0">
				<el-input v-model="user.name" placeholder="" class="input-with-select" />
			</el-form-item>
			<el-form-item label="团队权限" prop="ability">
				<el-select v-model="user.tag" placeholder="" class="select">
					<el-option v-for="item in abilities" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="项目权限" prop="projectAbility">
				<el-table :data="user.projectAbility" style="width: 100%" border>
					<el-table-column prop="project" label="项目" width="350px">
						<template #default="scope">
							<div class="name-column">
								<el-avatar :size="30" shape="square" :src="scope.row.image" />
								<span class="row-name">{{ scope.row.title }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="ability" label="权限" width="145px">
						<template #default="scope">
							<el-select v-model="scope.row.ability" placeholder="" class="select">
								<el-option v-for="item in abilities" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="default" size="large" plain color="rgb(255, 77, 79)" auto-insert-space class="change-btn">移除成员</el-button>
				<el-button type="default" size="large" auto-insert-space @click="inviteDialog = false">取 消</el-button>
				<el-button type="primary" size="large" color="#59A8B9" auto-insert-space class="dialog-btn" @click="confirmInvite">保存</el-button>
			</span>
		</template>
	</el-dialog>
	<div class="MemberPermission-wrap">
		<div class="statistic">
			<div class="statistic-item">
				<el-statistic title="成员" :value="8" />
			</div>
			<div class="statistic-item">
				<el-statistic title="游客" :value="0">
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
			<div class="statistic-item">
				<el-statistic title="待定" :value="0" />
			</div>
		</div>
		<div class="search-invite">
			<div class="search">
				<el-input v-model="searchContent" class="w-50 m-2" size="large" placeholder="搜索" :prefix-icon="Search" />
			</div>
			<div class="invite">
				<el-button type="primary" :icon="CirclePlusFilled" color="#59A8B9" class="invite-btn" @click="inviteMember">邀请成员</el-button>
			</div>
		</div>
		<div class="table">
			<el-table
				:data="tableData"
				height="250"
				style="width: 100%"
				:header-cell-style="{ fontWeight: '500', color: '#606266' }"
				:row-style="{ height: '70px' }"
			>
				<el-table-column prop="name" label="昵称" width="200px">
					<template #default="scope">
						<div class="name-column">
							<el-avatar :size="30" :src="scope.row.avatar" />
							<span class="row-name">{{ scope.row.name }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="email" label="邮箱" width="250px" />
				<el-table-column
					prop="tag"
					label="团队权限"
					width="240px"
					:filters="[
						{ text: '团队所有者', value: '团队所有者' },
						{ text: '团队管理员', value: '团队管理员' },
						{ text: '团队成员', value: '团队成员' },
						{ text: '游客', value: '游客' },
						{ text: '待定', value: '待定' },
						{ text: '账号暂停', value: '账号暂停' },
					]"
					:filter-method="filterTag"
					filter-placement="right"
				>
					<template #default="scope">
						<el-tag :type="map.get(scope.row.tag)">{{ scope.row.tag }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="changeTime" label="最近修改" sortable width="240px" :formatter="timeAgo" />
				<el-table-column label="" width="40">
					<template #default="scope">
						<el-icon class="pointer" @click="settingMember(scope.row)"><Setting /></el-icon>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Search, CirclePlusFilled, Refresh } from '@element-plus/icons-vue';
import type { TableColumnCtx, TableInstance } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

interface User {
	avatar: string;
	email: string;
	name: string;
	tag: string;
	changeTime: string;
	projectAbility: [
		{
			image: string;
			title: string;
			ability: string;
		},
	];
}
const user = ref<User>();
const teamName = ref('个人空间');
let map = new Map();
map.set('团队所有者', 'danger');
map.set('团队管理者', 'warning');
map.set('团队成员', 'success');
map.set('游客', '');
map.set('待定', 'info');
map.set('账号暂停', 'info');
const inviteDialog = ref(false);
interface RuleForm {
	link: string;
	ability: string;
}
const inviteFormRef = ref<FormInstance>();
const inviteForm = reactive<RuleForm>({
	link: '',
	ability: '',
});
const inviteFormRules = reactive<FormRules<RuleForm>>({
	ability: [{ required: true, message: '请选择所有权限', trigger: 'blur' }],
});
const settingDialog = ref(false);
// interface SettingRuleForm {
// 	avatar: '';
// 	email: string;
// 	name: string;
// 	ability: string;
// 	projectAbility: [
// 		{
// 			image: string;
// 			title: string;
// 			ability: string;
// 		},
// 	];
// }
const settingFormRef = ref<FormInstance>();
const settingForm = reactive<User>({
	avatar: '',
	email: '',
	name: '',
	tag: '',
	changeTime: '',
	projectAbility: [
		{
			image: '',
			title: '',
			ability: '',
		},
	],
});
const settingFormRules = reactive<FormRules<User>>({
	tag: [{ required: true, message: '请选择所有权限', trigger: 'blur' }],
});
const abilities = [
	{
		value: '管理者',
		label: '管理者',
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
const searchContent = ref('');
const tableData: User[] = [
	{
		avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
		name: 'Tom',
		email: '98839392@qq.com',
		tag: '团队所有者',
		changeTime: '2023-08-11 09:51:00',
		projectAbility: [
			{
				image: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				title: 'ApiPlayer',
				ability: '管理员',
			},
		],
	},
	{
		avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
		name: 'Tom',
		email: '98839392@qq.com',
		tag: '团队管理员',
		changeTime: '2023-08-10 23:00:03',
		projectAbility: [
			{
				image: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				title: 'ApiPlayer',
				ability: '编辑者',
			},
		],
	},
	{
		avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
		name: 'Tom',
		email: '98839392@qq.com',
		tag: '团队管理员',
		changeTime: '2021-09-12 23:00:03',
		projectAbility: [
			{
				image: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				title: 'ApiPlayer',
				ability: '只读成员',
			},
		],
	},
	{
		avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
		name: 'Tom',
		email: '98839392@qq.com',
		tag: '团队成员',
		changeTime: '2021-09-12 23:00:03',
		projectAbility: [
			{
				image: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				title: 'ApiPlayer',
				ability: '禁止访问',
			},
		],
	},
];

const inviteMember = () => {
	inviteDialog.value = true;
};
const confirmInvite = () => {
	inviteDialog.value = false;
};

const settingMember = (row: User) => {
	settingDialog.value = true;
	user.value = row;
};

const filterTag = (value: string, row: User) => {
	return row.tag === value;
};

const timeAgo = (row: User, column: TableColumnCtx<User>) => {
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = day * 30;
	const now = new Date().getTime();

	const dateTimeStampNumber = new Date(row.changeTime).getTime();
	const diffValue = now - dateTimeStampNumber;

	if (diffValue < 0) {
		return '';
	}

	let result = '';
	const minC = diffValue / minute;
	const hourC = diffValue / hour;
	const dayC = diffValue / day;
	const weekC = diffValue / week;
	const monthC = diffValue / month;

	if (monthC >= 1 && monthC < 4) {
		result = ' ' + parseInt(monthC.toString()) + '月前';
	} else if (weekC >= 1 && weekC < 4) {
		result = ' ' + parseInt(weekC.toString()) + '周前';
	} else if (dayC >= 1 && dayC < 7) {
		result = ' ' + parseInt(dayC.toString()) + '天前';
	} else if (hourC >= 1 && hourC < 24) {
		result = ' ' + parseInt(hourC.toString()) + '小时前';
	} else if (minC >= 1 && minC < 60) {
		result = ' ' + parseInt(minC.toString()) + '分钟前';
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = '刚刚';
	} else {
		result = row.changeTime.split(' ')[0];
	}
	return result;
};
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

.alert {
	color: rgba(16, 24, 40, 0.24);
}

.select {
	width: 100%;
}

.dialog-btn {
	color: #fff;
	font-size: 14px;
	.btn-width {
		width: 100%;
	}
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

:deep(.el-statistic__head) {
	font-weight: 600;
	font-size: 16px;
}
:deep(.el-statistic__content) {
	font-weight: 600;
	font-size: 38px;
}
// 	margin: 0;
// }
</style>
