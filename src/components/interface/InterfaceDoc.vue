<template>
	<el-row>
		<el-col :span="24">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="文档" name="first"> <Doc></Doc> </el-tab-pane>
				<el-tab-pane label="修改文档" name="second"> <Edit @clickrun="jumpRunApi"></Edit> </el-tab-pane>
				<el-tab-pane label="运行" name="third"> <Test></Test> </el-tab-pane>
				<!-- <el-tab-pane label="测试" name="fourth"> <Tmp></Tmp> </el-tab-pane> -->
			</el-tabs>
		</el-col>
	</el-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import Doc from './doc/index.vue';
import Edit from './edit/index.vue';
import Test from './test/index.vue';
// import Tmp from './tmp/index.vue';
import { apiStore } from '@/store/apis.ts';
// import { useRouter } from 'vue-router';

interface Request {
	api_desc: string;
	api_editor_id: number;
	api_env_url: number[];
	api_id: number;
	api_method: string;
	api_name: string;
	api_principal_id: number;
	api_request: ApiRequest[];
	api_response: ApiResponse[];
	api_status: number;
	api_url: string;
	dictionary_id: number;
}

interface ApiRequest {
	params_list?: ParamsList[];
	params_obj?: { [key: string]: any };
	type: number;
}

interface ParamsList {
	param_desc: string;
	param_name: string;
	param_type: number;
}

interface ApiResponse {
	http_status: number;
	response_body: string;
	response_name: string;
}
const apiInfo = ref<Request | undefined>();

const apiOperation = apiStore();
onMounted(() => {
	getInfo();
});

const getInfo = async () => {
	await apiOperation.getApiInfo('98');
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
const activeName = ref('first');

// 点击运行跳转
// const jumpUrl = ref('');
const jumpRunApi = () => {
	activeName.value = 'third';
	// jumpUrl.value = para
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};

// onMounted(async () => {
// 	// const router = useRouter();
// 	// const params = ref(router.currentRoute.value.params);
// 	// thisId.value = params.value.api_id;
// 	const res = await getApiInfo();
// 	console.log(res);

// 	if (res.status == 200) {
// 		apiInfo.value = res.data.api_info;
// 	}
// });
</script>
<style scoped lang="less">
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
</style>
