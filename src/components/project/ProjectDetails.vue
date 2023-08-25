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
				<div class="main">
					<el-tabs v-model="activeName" class="demo-tabs" style="padding-left: 20px">
						<el-tab-pane label="文档" name="first"> <Doc /> </el-tab-pane>
						<el-tab-pane v-if="canEditDoc" label="修改文档" name="second"> <Edit @clickrun="jumpRunApi" /> </el-tab-pane>
						<el-tab-pane label="运行" name="third"> <Test /> </el-tab-pane>
						<!-- <el-tab-pane label="测试" name="fourth"> <Tmp /> </el-tab-pane> -->
					</el-tabs>
				</div>
			</el-row>
		</div>
	</el-row>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch, computed } from 'vue';
import Doc from './ModelDetails/doc/index.vue';
import Edit from './ModelDetails/edit/index.vue';
import Test from './ModelDetails/test/index.vue';
import { apiStore } from '../../store/apis';
import { useRouter, useRoute } from 'vue-router';
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

const apiOperation = apiStore();
const apiInfo = ref(apiOperation.apiInfo);
const router = useRouter();
const thisId = router.currentRoute.value.query.api_id;
onBeforeMount(() => {
	if (thisId) {
		getInfo(thisId);
	}
	apiInfo.value = apiOperation.apiInfo;
});

const getInfo = async (thisId: any) => {
	await apiOperation.getApiInfo(thisId);
	apiInfo.value = apiOperation.apiInfo;
};

const canEditDoc = computed(() => {
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] !== ProjectRole.READ_ONLY;
});

onBeforeRouteUpdate((to) => {
	console.log('to', to);
	if (thisId) {
		getInfo(to.query.api_id);
	}
});

watch(
	apiOperation.apiInfo,
	(newVal, _) => {
		if (newVal != undefined && newVal != null) {
			apiInfo.value = newVal;
		}
	},
	{ immediate: true, deep: true }
);

const route = useRoute();
watch(route, (newValue, oldValue) => {
	console.log('projectwatch 已触发', newValue.query.api_id, oldValue);
	getInfo(newValue.query.api_id);
	apiInfo.value = apiOperation.apiInfo;
});
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
