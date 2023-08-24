<template>
	<div class="visit-wrap">
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
import { recentlyVisited, addRecentProject } from '../../api/projects';
import { useRouter } from 'vue-router';
import { useBaseStore } from '../../store/index';

const router = useRouter();
const baseStore = useBaseStore();
interface Project {
	id: number;
	avatar: string;
	name: string;
	time: string;
}
const projectList: Project[] = [
	{
		id: 1,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
		time: '2023-08-11 15:34:12',
	},
	{
		id: 2,
		avatar: '../../static/svg/LoginLogo.svg',
		name: 'test',
		time: '2023-08-11 13:34:12',
	},
];

const timeAgo = (dateTime: string) => {
	// dateTime格式：2023-08-23T19:03:47.000Z
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = day * 30;
	const now = new Date().getTime();

	// 由于时差，需要加8小时
	const dateTimeStampNumber = new Date(dateTime).getTime() + 8 * hour;
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
		result = dateTime.split(' ')[0];
	}
	return result;
};
const getRecentlyVisited = () => {
	recentlyVisited({ user_id: baseStore.user_info.user_id }).then(async (res) => {
		if (res.data) {
			baseStore.setLastVisitedList(res.data.data);
		}
	});
};
const goDetail = (index: number) => {
	router.push({ path: `/project/${baseStore.lastVisitedList[index].project_id}` });
	addRecentProject({ user_id: baseStore.user_info.user_id, project_id: baseStore.lastVisitedList[index].project_id });
};
onMounted(() => {
	getRecentlyVisited();
});
</script>

<style scoped lang="less">
.visit-wrap {
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
			// 弥散阴影
			box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
		}
	}
}
</style>
