<template>
	<div class="projectdetil"></div>
	<el-row type="flex" justify="center">
		<div><SideNav /></div>
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
				<div v-if="thisId" class="main">
					<el-tabs v-model="activeName" v-loading="loading" class="demo-tabs" style="padding-left: 20px">
						<el-tab-pane label="文档" name="first"> <Doc /> </el-tab-pane>
						<el-tab-pane v-if="canEditDoc" label="修改文档" name="second"> <Edit @clickrun="jumpRunApi" /> </el-tab-pane>
						<el-tab-pane label="运行" name="third"> <Test /> </el-tab-pane>
					</el-tabs>
				</div>
				<ChooseApi v-else />
			</el-row>
		</div>
	</el-row>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue';
import Doc from './ModelDetails/doc/index.vue';
import Edit from './ModelDetails/edit/index.vue';
import Test from './ModelDetails/test/index.vue';
import { apiStore } from '../../store/apis';
import { useRoute } from 'vue-router';
import ChooseApi from './ModelDetails/components/ChooseApi.vue';
import SideBar from './ModelDetails/components/SideBar.vue';
import EnvHeader from './ModelDetails/components/EnvHeader.vue';
import SideNav from './ModelSettings/SideNav.vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useBaseStore } from '@/store/index';
import { ProjectRole } from '@/utils/projectPermission';
const baseStore = useBaseStore();

const activeName = ref('first');

// 点击运行跳转
const jumpRunApi = () => {
	activeName.value = 'third';
};

const route = useRoute();
const apiOperation = apiStore();
const apiInfo = ref(apiOperation.apiInfo);
const thisId = ref<number>(0);
const loading = ref<boolean>(false);

const getInfo = async (thisId: number) => {
	loading.value = true;
	await apiOperation.getApiInfo(thisId);
	apiInfo.value = apiOperation.apiInfo;
	await nextTick();
	loading.value = false;
};

const canEditDoc = computed(() => {
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] !== ProjectRole.READ_ONLY;
});

onBeforeRouteUpdate((to) => {
	console.log('to', to);
	if (thisId.value) {
		getInfo(Number(to.query.api_id));
	}
});

watch(
	apiOperation.apiInfo,
	(newV, _) => {
		if (newV != undefined && newV != null) {
			apiInfo.value = newV;
		}
	},
	{ immediate: true, deep: true }
);

watch(
	() => route.query.api_id,
	(newV, _) => {
		thisId.value = Number(newV);
		if (thisId.value) {
			getInfo(thisId.value);
		}
		apiInfo.value = apiOperation.apiInfo;
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.projectdetil {
	background-color: #ffffff;
	padding-left: 50px;
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
