<template>
	<div class="SideNav-wrapper">
		<div class="item" @click="clickhandler(1)">
			<el-icon size="20px"><Box /></el-icon>
			<div>接口管理</div>
		</div>
		<div class="divider" />
		<div class="item" @click="clickhandler(2)">
			<el-icon size="20px"><Setting /></el-icon>
			<div>项目设置</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const inviteDialog = ref(false);

const clickhandler = (type: number): void => {
	switch (type) {
		case 0:
			router.push('');
			break;
		case 1:
			if (route.path.indexOf('projectMain') === -1) {
				router.push(`/projectMain/${route.params.project_id}`);
			}
			break;
		case 2:
			router.push('/projectSettings');
			if (route.path.indexOf('projectSettings') === -1) {
				router.push(`/projectSettings/${route.params.project_id}`);
			}
			break;
		case 3:
			inviteMember();
			break;
		default:
			break;
	}
};

const inviteMember = () => {
	inviteDialog.value = true;
};
</script>

<style scoped lang="less">
.SideNav-wrapper {
	width: 70px;
	height: 100%;
	min-height: 1000px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: #fff;
	font-size: 14px;
	gap: 20px;
	padding-top: 10px;
	border-left: 1px solid #bdbdbd;
	border-right: 1px solid #bdbdbd;
	border-bottom: 1px solid #bdbdbd;
	.divider {
		width: 100%;
		height: 1px;
		background-color: #bdbdbd;
	}
	.item {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 6px;
		cursor: pointer;
	}
}
</style>
