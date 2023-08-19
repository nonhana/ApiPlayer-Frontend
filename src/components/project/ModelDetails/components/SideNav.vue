<template>
	<div class="nav_side">
		<div class="item" @click="clickhandler(0)">
			<el-icon size="20px"><Box /></el-icon>
			<div>接口管理</div>
		</div>
		<!-- <div><component :is="componentId"></component></div> -->
		<div class="item" @click="clickhandler(1)">
			<el-icon size="20px"><Setting /></el-icon>
			<div>项目设置</div>
		</div>
		<div class="item" @click="clickhandler(2)">
			<el-icon size="20px"><UserFilled /></el-icon>
			<div>邀请成员</div>
		</div>
	</div>
	<el-dialog v-model="inviteDialog" title="邀请成员" width="35%">
		<template #header>
			<div class="dialog-title">邀请加入 {{ teamName }}</div>
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
				<el-table :data="inviteForm.searchUserData" height="300" style="width: 100%" border>
					<el-table-column prop="avatar" label="昵称" width="200px">
						<template #default="scope">
							<div class="name-column">
								<el-avatar :size="30" shape="square" :src="scope.row.avatar" />
								<span class="row-name">{{ scope.row.name }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="email" label="邮箱" width="200px" />
					<el-table-column width="98px" align="center">
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
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { Search, CirclePlusFilled, Refresh } from '@element-plus/icons-vue';
import { TableColumnCtx, TableInstance, FormInstance, FormRules, ElMessage } from 'element-plus';
// import { inviteUser, setMemberIdentity, removeMember } from '@/api/teams';
import { searchUser } from '@/api/users';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const clickhandler = (type: number): void => {
	switch (type) {
		case 0:
			if (route.path.indexOf('projectMain') === -1) {
				router.push('/projectMain/1');
			}
			break;
		case 1:
			router.push('/projectSettings');
			if (route.path.indexOf('projectSettings') === -1) {
				router.push('/projectSettings');
			}
			break;
		case 2:
			inviteMember();
			break;
		default:
			break;
	}
};

interface User {
	avatar: string;
	email: string;
	name: string;
	tag?: string;
	changeTime?: string;
	projectAbility?: [
		{
			image: string;
			title: string;
			ability: string;
		},
	];
}

interface RuleForm {
	username: string;
	searchUserData: User[];
}

const inviteDialog = ref(false);

const inviteMember = () => {
	inviteDialog.value = true;
};
const teamName = ref('个人空间');

const inviteFormRef = ref<FormInstance>();
const inviteForm = reactive<RuleForm>({
	username: '',
	searchUserData: [
		{
			avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
			name: 'Tom',
			email: '98839392@qq.com',
		},
		{
			avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
			name: 'Tom',
			email: '98839392@qq.com',
		},
		{
			avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
			name: 'Tom',
			email: '98839392@qq.com',
		},
	],
});
const inviteFormRules = reactive<FormRules<RuleForm>>({
	username: [{ required: true, message: '请选择用户名', trigger: 'blur' }],
});
const search = () => {
	const res = searchUser({ username: inviteForm.username });
};
</script>
<style lang="less" scoped>
.nav_side {
	width: 70px;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: #f9fafb;
	font-size: 14px;
	gap: 8px;
	padding-top: 10px;
	.item {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 6px;
		// background-color: pink;
	}
}
</style>
