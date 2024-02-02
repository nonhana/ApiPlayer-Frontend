<template>
	<div class="VisitWindow-wrapper">
		<div class="visit-header">
			<div class="visit-name">最近访问</div>
		</div>
		<div class="visit-container">
			<div v-for="(item, index) in baseStore.lastVisitedList" :key="index" class="project" @click="goDetail(index)">
				<div class="project-img">
					<el-image shape="square" size="20" :src="item.project_img">
						<template #error>
							<div class="image-slot">
								<el-icon><Picture /></el-icon>
							</div>
						</template>
					</el-image>
				</div>
				<div class="project-info">
					<div class="project-name">{{ item.project_name }}</div>
					<div class="visit-time">最近访问：{{ timeAgo(item.last_access_time) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { recentlyVisited, addRecentProject } from '@/api/projects';
import { timeAgo } from '@/utils';

const router = useRouter();
const { baseStore } = useStore();

const goDetail = (index: number) => {
	router.push({ path: `/project/${baseStore.lastVisitedList[index].project_id}` });
	addRecentProject({ project_id: baseStore.lastVisitedList[index].project_id });
};

onMounted(async () => {
	const res = await recentlyVisited();
	if (res.result_code === 0) {
		baseStore.setLastVisitedList(res.result);
	}
});
</script>

<style scoped lang="less">
.VisitWindow-wrapper {
	width: 100%;
	padding: 0 32px;
	display: flex;
	flex-direction: column;

	.visit-header {
		margin: 30px 0;
		display: flex;

		.visit-name {
			color: rgba(16, 24, 40, 0.8);
			font-size: 20px;
			font-weight: 500;
			margin-right: 10px;
		}
	}

	.visit-container {
		display: flex;
		flex-direction: column;
		.project {
			display: flex;
			gap: 15px;
			padding: 16px 8px 16px 16px;
			border-bottom: 1px solid #f2f4f7;
			cursor: pointer;
			transition: all 0.3s;
			.project-img {
				width: 40px;
				height: 40px;
			}
			.project-info {
				display: flex;
				flex-direction: column;
				gap: 8px;
				.project-name {
					color: rgba(16, 24, 40, 0.8);
					font-weight: 500;
					font-size: 14px;
				}
				.visit-time {
					color: rgba(16, 24, 40, 0.56);
					font-size: 12px;
				}
			}
		}
		.project:hover {
			box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
		}
	}
}
</style>
