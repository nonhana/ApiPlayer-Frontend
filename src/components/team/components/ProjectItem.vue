<template>
	<div v-for="(project, index) in baseStore.teamDetailedInfo.project_list" :key="index" class="project" @click="goDetail(index)">
		<div class="project-header">
			<div class="project-img">
				<el-image shape="square" size="20" :src="project.project_img">
					<template #error>
						<div class="image-slot">
							<el-icon><Picture /></el-icon>
						</div>
					</template>
				</el-image>
			</div>
			<div v-if="canDeleteProject(project.project_id)">
				<el-dropdown size="large">
					<el-icon><More /></el-icon>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="confirmDeleteProject(index)">删除项目</el-dropdown-item>
							<el-dropdown-item @click="changeProject(index)">项目设置</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
		<div class="project-info">
			<div class="project-name">{{ project.project_name }}</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.project {
	margin: 30px;
	width: 250px;
	display: flex;
	flex-direction: column;
	border: 1px solid #f2f4f7;
	border-radius: 8px;
	padding: 16px;
	cursor: pointer;
	transition: all 0.3s;
	.dialog-title {
		color: rgba(16, 24, 40, 0.8);
		font-size: 16px;
		font-weight: 500;
	}
	.project-header {
		display: flex;
		justify-content: space-between;
		.project-img {
			width: 40px;
			height: 40px;
		}
	}
	.project-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		.project-name {
			color: rgba(16, 24, 40, 0.8);
			font-weight: 500;
			font-size: 14px;
		}
	}
}
.project:hover {
	box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.16);
}
</style>
