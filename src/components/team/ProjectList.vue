<template>
	<div class="project-wrap">
		<div v-if="baseStore.teamDetailedInfo.project_list.length === 0" class="empty-alert">
			<el-empty description="该团队目前还没有项目哦~" :image-size="200" />
		</div>
		<div v-for="(project, index) in baseStore.teamDetailedInfo.project_list" :key="index">
			<ProjectItem :project="project" :index="index" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { teamInfo } from '@/api/teams';
import { useBaseStore } from '@/store';
import ProjectItem from './components/ProjectItem.vue';

const baseStore = useBaseStore();

onMounted(async () => {
	await teamInfo({ team_id: baseStore.curTeamInfo.team_id });
});
</script>

<style scoped lang="less">
.project-wrap {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.empty-alert {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

//去除下拉框的黑色边框
:focus {
	outline: 0;
}
</style>
