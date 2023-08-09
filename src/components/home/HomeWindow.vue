<template>
	<div class="HomeWindow-wrap">
		<div class="common-layout">
			<el-container>
				<el-aside width="300px">
					<el-row class="tac">
						<el-col :span="24">
							<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
								<el-sub-menu index="1">
									<template #title>
										<img src="./imgs/Team.png" alt="" style="width: 18px; margin-right: 4px" />
										<span>我的团队</span>
									</template>
									<el-menu-item index="1-1"> console.log(undefined)</el-menu-item>
									<el-menu-item index="1-2" @click="clickMyTeamHandler('1')"> 个人空间</el-menu-item>
									<!-- <el-menu-item-group style="margin-left: -5px">
										<template #title>
											<el-icon><Plus style="font-size: 14px; margin-left: -2px" /></el-icon>
											<span style="margin-left: -6px">创建团队</span>
										</template>
									</el-menu-item-group> -->
									<el-menu-item index="1-3" @click="createTeam">
										<el-icon>
											<Plus style="font-size: 18px; margin-left: -8px" />
										</el-icon>
										<span style="margin-left: -8px">创建团队</span>
									</el-menu-item>
								</el-sub-menu>
								<el-menu-item index="4" @click="recentlyVisitedClick">
									<!-- <router-link to="/home/mainWindow"> -->
									<img src="../../static/svg/Clock.svg" alt="" style="width: 16px; margin-right: 4px" />
									<span>最近访问</span>
									<!-- </router-link> -->
								</el-menu-item>
							</el-menu>
						</el-col>
					</el-row>
				</el-aside>
				<el-main>
					<router-view />
					<!-- <MainWindow></MainWindow> -->
				</el-main>
			</el-container>
		</div>
		<NewTeam v-if="isShow" :close-team-window="closeTeamWindow" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import NewTeam from './NewTeam/NewTeam.vue';
// import MainWindow from './MainWindow/MainWindow.vue';

const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};

let isShow = ref(false);

const createTeam = () => {
	isShow.value = true;
};

const closeTeamWindow = () => {
	isShow.value = false;
	console.log(111);
};

const recentlyVisitedClick = () => {
	router.push({ name: 'recentlyVisited' });
};

const clickMyTeamHandler = (id: string) => {
	router.push({ path: `/home/mainWindow/${id}` });
};
</script>

<style lang="less" scoped>
.HomeWindow-wrap {
	position: relative;
	width: 1350px;
	height: 100%;
	font-size: 16px;

	.common-layout {
		display: flex;
		justify-content: center;
		flex-direction: row;
	}

	aside {
		width: 300px;
		height: 100vh;
		opacity: 1;

		background-color: #fff;
	}

	.el-main {
		flex: 1;
		background-color: #fff;
		padding: 0;
	}
}
</style>
