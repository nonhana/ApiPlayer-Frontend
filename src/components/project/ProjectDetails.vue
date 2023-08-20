<template>
	<div class="projectdetil"></div>
	<el-row type="flex" justify="center">
		<div>
			<SideBar />
		</div>
		<div>
			<el-row>
				<div>
					<EnvHeader />
				</div>
			</el-row>
			<el-row>
				<div>
					<el-tabs v-model="activeName" class="demo-tabs" style="padding-left: 20px">
						<el-tab-pane label="文档" name="first"> <Doc /> </el-tab-pane>
						<el-tab-pane label="修改文档" name="second"> <Edit @clickrun="jumpRunApi"></Edit> </el-tab-pane>
						<!-- <el-tab-pane label="运行" name="third"> <Test /> </el-tab-pane> -->
						<!-- <el-tab-pane label="测试" name="fourth"> <Tmp /> </el-tab-pane> -->
					</el-tabs>
				</div>
			</el-row>
		</div>
	</el-row>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import Doc from './ModelDetails/doc/index.vue';
import Edit from './ModelDetails/edit/index.vue';
// import Test from './ModelDetails/test/index.vue';
// import Tmp from './ModelDetails/tmp/index.vue';
import { apiStore } from '../../store/apis';
import { useRouter, useRoute } from 'vue-router';
import SideBar from './ModelDetails/components/SideBar.vue';
import EnvHeader from './ModelDetails/components/EnvHeader.vue';

const activeName = ref('first');

// 点击运行跳转
// const jumpUrl = ref('');
const jumpRunApi = () => {
	activeName.value = 'third';
	// jumpUrl.value = para
};

const apiOperation = apiStore();
const apiInfo = ref(apiOperation.apiInfo);
const router = useRouter();
const thisId = router.currentRoute.value.query.api_id;
onBeforeMount(() => {
	getInfo(thisId);
	apiInfo.value = apiOperation.apiInfo;
});

const getInfo = async (thisId) => {
	await apiOperation.getApiInfo(thisId);
	apiInfo.value = apiOperation.apiInfo;
};

watch(
	apiOperation.apiInfo,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			apiInfo.value = newVal;
		}
	},
	{ immediate: true, deep: true }
);

// const route = useRoute();
// watch(route, (newValue, oldValue) => {
// 	console.log('projecrwatch 已触发', newValue.query.api_id, oldValue);
// 	getInfo(newValue.query.api_id);
// 	apiInfo.value = apiOperation.apiInfo;
// });
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
</style>
