<template>
	<div class="index">
		<el-row>
			<el-col :span="2">
				<el-button type="primary" round size="large">{{ apiInfo.api_method }}</el-button>
			</el-col>
			<el-col :span="6">
				<el-input v-model="apiStore.preUrl" disabled size="large" />
			</el-col>
			<el-col :span="12">
				<el-input v-model="apiInfo.api_url" disabled size="large" />
			</el-col>
			<el-col :span="4">
				<el-button v-loading.fullscreen.lock="runningApi" type="primary" round size="large" style="margin-left: 20px" @click="runApi">运行</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<el-text class="mx-1" size="large">请求参数</el-text>
		</el-row>
		<el-row>
			<div>
				<el-tabs v-model="activeName" class="edit-tabs">
					<el-tab-pane label="Params" name="first">
						<TestRequestTable :request-data="requestParams[0]" />
						<div v-if="globalQueryParams.length > 0">
							<el-divider><span style="color: #aaa">全局Param</span></el-divider>
							<el-table :data="globalQueryParams" border style="width: 100%">
								<el-table-column align="center" prop="param_name" label="name" />
								<el-table-column show-overflow-tooltip align="center" prop="param_value" label="value" />
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="Body" name="second">
						<el-tabs v-model="bodyActiveName" class="body-tabs">
							<el-tab-pane label="form-data" name="bodyFirst">
								<TestRequestTable :request-data="requestParams[1]" />
							</el-tab-pane>
							<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
								<TestRequestTable :request-data="requestParams[2]" />
							</el-tab-pane>
							<el-tab-pane label="json" name="bodyThird">
								<div style="margin-bottom: 20px">
									<el-button @click="executeMock">Mock Data</el-button>
								</div>
								<div>
									<v-ace-editor
										ref="aceEditor"
										v-model:value="requestJSON"
										lang="json"
										:theme="aceConfig.theme"
										:options="aceConfig.options"
										:readonly="aceConfig.readOnly"
										style="width: 500px; min-height: 150px"
										class="ace-editor"
									/>
								</div>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Cookie" name="third">
						<TestRequestTable :request-data="requestParams[3]" />
						<div v-if="globalCookies.length > 0">
							<el-divider><span style="color: #aaa">全局Cookie</span></el-divider>
							<el-table :data="globalCookies" border style="width: 100%">
								<el-table-column align="center" prop="param_name" label="name" />
								<el-table-column show-overflow-tooltip align="center" prop="param_value" label="value" />
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="Header" name="fourth">
						<TestRequestTable :request-data="requestParams[4]" />
						<div v-if="globalHeaders.length > 0">
							<el-divider><span style="color: #aaa">全局Header</span></el-divider>
							<el-table :data="globalHeaders" border style="width: 100%">
								<el-table-column align="center" prop="param_name" label="name" />
								<el-table-column show-overflow-tooltip align="center" prop="param_value" label="value" />
							</el-table>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-row>
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
		</el-row>
		<el-row>
			<el-row>
				<el-tabs v-model="responseActiveName" type="card" class="res-tabs">
					<el-tab-pane :label="'接口运行状态：' + resCodeMap.get(result.result_code)" name="first">
						<div>状态信息：{{ result.result_msg }}</div>
						<el-scrollbar v-if="result.result">
							<div style="height: 500px">
								<VueJsonPretty :data="result.result" />
							</div>
						</el-scrollbar>
						<div v-else class="empty">
							<span>你请求的数据将会显示在这里~！</span>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-row>
		</el-row>
		<div style="height: 20px"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { executeApi } from '@/api/apis';
import { mock, getProjectGlobalInfo } from '@/api/projects';
import type { RequestParams } from '@/utils/types';
import TestRequestTable from '../components/TestRequestTable.vue';
import { ElNotification } from 'element-plus';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';

const { apiStore, baseStore } = useStore();
const route = useRoute();

// ace编辑器配置
const aceConfig = reactive({
	lang: 'json', //解析json
	theme: 'chrome', //主题
	readOnly: false, //是否只读
	options: {
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true,
		tabSize: 2,
		showPrintMargin: false,
		fontSize: 13,
		// 高度自适应
		autoScrollEditorIntoView: true,
	},
});
const activeName = ref('first');
const bodyActiveName = ref('bodyFirst');
const responseActiveName = ref('first');
const runningApi = ref<boolean>(false);

const resCodeMap: Map<number, string> = new Map([
	[-1, '尚未发送请求'],
	[0, '成功'],
	[1, '失败'],
]);

const requestParams = ref<RequestParams[]>([
	{
		type: 0,
		params_list: [
			{
				param_name: '',
				param_value: '',
			},
		],
	},
	{
		type: 1,
		params_list: [
			{
				param_name: '',
				param_value: '',
			},
		],
	},
	{
		type: 2,
		params_list: [
			{
				param_name: '',
				param_value: '',
			},
		],
	},
	{
		type: 3,
		params_list: [
			{
				param_name: '',
				param_value: '',
			},
		],
	},
	{
		type: 4,
		params_list: [
			{
				param_name: '',
				param_value: '',
			},
		],
	},
]);
const requestJSON = ref('');
const globalHeaders = ref<any[]>([]);
const globalCookies = ref<any[]>([]);
const globalQueryParams = ref<any[]>([]);

const apiInfo = ref(apiStore.apiInfo);
const result = reactive<{
	result_code: number;
	result_msg: string;
	result?: any;
}>({
	result_code: -1,
	result_msg: '',
});

// mock数据，仅限Body-JSON
const executeMock = async () => {
	if (apiStore.apiInfo.api_request_JSON) {
		let { result } = await mock(JSON.parse(apiStore.apiInfo.api_request_JSON.JSON_body));
		// 将mock好的数据放入requestJSON中
		if (result.root) {
			result = result.root;
		}
		requestJSON.value = JSON.stringify(result, null, 2);
	} else {
		ElNotification({
			title: 'Mock失败',
			message: '请先填写Body-JSON',
			type: 'error',
		});
	}
};
// 运行api
const runApi = async () => {
	runningApi.value = true;
	const requestBody = {
		local_ip: baseStore.localIp,
		api_id: apiInfo.value.api_id,
		api_request_params: requestParams.value,
		// 去掉所有的\n和\t
		api_request_JSON: requestJSON.value.replace(/\n/g, '').replace(/\t/g, ''),
	};
	const res = await executeApi(requestBody);
	if (res.result_code === 0) {
		result.result_code = res.result_code;
		result.result_msg = res.result_msg;
		result.result = res.result.data;
		runningApi.value = false;
		ElNotification({
			title: '成功',
			message: '接口运行成功',
			type: 'success',
		});
	} else {
		result.result_code = res.result_code;
		result.result_msg = res.result_msg;
		result.result = res.result.data;
		runningApi.value = false;
		ElNotification({
			title: '失败',
			message: '接口运行失败',
			type: 'error',
		});
	}
};

watch(
	() => apiStore.apiInfo,
	(newV, _) => {
		if (newV) {
			apiInfo.value = newV;
			if (newV.api_request_params.length > 0) {
				requestParams.value.forEach((item) => {
					newV.api_request_params.forEach((item2) => {
						if (item.type === item2.type) {
							item2.params_list.forEach((item3, index: number) => {
								item.params_list[index] = {
									param_name: item3.param_name,
									param_value: item3.param_type === 2 ? '' : 0,
								};
							});
						}
					});
				});
			}
		}
	}
);

onMounted(async () => {
	const res = await getProjectGlobalInfo({
		project_id: Number(route.params.project_id),
	});
	res.result.global_params.forEach((item) => {
		if (item.type === 0) {
			item.params_list.forEach((item2) => {
				globalHeaders.value.push({
					param_name: item2.param_name,
					param_value: typeof item2.param_value === 'string' ? JSON.parse(item2.param_value) : item2.param_value,
				});
			});
		} else if (item.type === 1) {
			item.params_list.forEach((item2) => {
				globalCookies.value.push({
					param_name: item2.param_name,
					param_value: typeof item2.param_value === 'string' ? JSON.parse(item2.param_value) : item2.param_value,
				});
			});
		} else if (item.type === 2) {
			item.params_list.forEach((item2) => {
				globalQueryParams.value.push({
					param_name: item2.param_name,
					param_value: typeof item2.param_value === 'string' ? JSON.parse(item2.param_value) : item2.param_value,
				});
			});
		}
	});
});
</script>

<style scoped lang="less">
.index {
	width: 978px;

	.el-row {
		margin-bottom: 20px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.edit-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}

	.body-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}

	.res-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}

	.empty {
		width: 978px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: #c0c4cc;
	}
}
</style>
