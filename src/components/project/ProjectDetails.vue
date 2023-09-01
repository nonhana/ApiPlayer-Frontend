<template>
	<div class="ProjectDetails-wrap">
		<el-row type="flex" justify="space-between" style="width: 1300px">
			<div><SideNav /></div>
			<div style="display: flex">
				<div>
					<SideBar />
				</div>
				<div>
					<el-row style="margin: 0">
						<div>
							<EnvHeader />
						</div>
					</el-row>
					<el-row>
						<div v-if="route.query.api_id" class="main">
							<el-tabs v-model="activeName" v-loading="fetching" class="demo-tabs" style="padding-left: 20px">
								<el-tab-pane label="文档" name="first"> <Doc /> </el-tab-pane>
								<el-tab-pane v-if="canEditDoc" label="修改文档" name="second"> <Edit @clickrun="jumpRunApi" /> </el-tab-pane>
								<el-tab-pane label="运行" name="third"> <Test /> </el-tab-pane>
							</el-tabs>
						</div>
						<ChooseApi v-else />
					</el-row>
				</div>
			</div>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import Doc from './ModelDetails/doc/index.vue';
import Edit from './ModelDetails/edit/index.vue';
import Test from './ModelDetails/test/index.vue';
import { apiStore } from '../../store/apis';
import { useRoute } from 'vue-router';
import ChooseApi from './ModelDetails/components/ChooseApi.vue';
import SideBar from './ModelDetails/components/SideBar.vue';
import EnvHeader from './ModelDetails/components/EnvHeader.vue';
import SideNav from './ModelSettings/SideNav.vue';
import { useBaseStore } from '@/store/index';
import { ProjectRole } from '@/utils/projectPermission';

const route = useRoute();
const apiOperation = apiStore();
const baseStore = useBaseStore();
const activeName = ref('first');
const fetching = ref<boolean>(false);

// 点击运行跳转
const jumpRunApi = () => {
	activeName.value = 'third';
};

// 是否有编辑文档权限
const canEditDoc = computed(() => {
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] !== ProjectRole.READ_ONLY;
});

watch(
	() => route.query.api_id,
	async (newV, _) => {
		if (newV) {
			fetching.value = true;
			await apiOperation.getApiInfo(Number(newV));
			fetching.value = false;
		}
		activeName.value = 'first';
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.ProjectDetails-wrap {
	background-color: #fff;

	.el-tabs--border-card {
		min-width: 1000px;

		.el-tabs__nav {
			width: 100%;

			.el-tabs__item {
				height: 30px;
				line-height: 30px;
				width: calc(100% / 7);
			}
		}
	}
	.demo-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}
}
.main {
	border: 1px solid #bdbdbd;
	border-radius: 10px;
	overflow: hidden;
}
</style>
