<template>
	<div class="index">
		<el-row>
			<el-col :span="2">
				<!-- <el-select v-model="api_method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select> -->
				<el-tag type="" class="mx-1" effect="dark" round size="large">
					{{ apiInfo.api_method }}
				</el-tag>
			</el-col>
			<el-col :span="18">
				<el-input v-model="apiInfo.api_url" disabled size="large" />
			</el-col>
			<el-col :span="4">
				<el-button type="primary" round size="large" style="margin-left: 20px" @click="runApi">运行</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<span>请求参数</span>
		</el-row>
		<el-row>
			<div>
				<el-tabs v-model="activeName" class="edit-tabs">
					<el-tab-pane label="Parmas" name="first">
						<TestRequestTable :request-data="requestParams[0]" />
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
										v-model:value="requestJSON"
										lang="json"
										:theme="aceConfig.theme"
										:options="aceConfig.options"
										:readonly="aceConfig.readOnly"
										style="width: 500px; min-height: 100px"
										class="ace-editor"
									/>
								</div>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Cookie" name="third">
						<TestRequestTable :request-data="requestParams[3]" />
					</el-tab-pane>
					<el-tab-pane label="Header" name="fourth">
						<TestRequestTable :request-data="requestParams[4]" />
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-row>
		<el-row>
			<span>返回响应</span>
		</el-row>
		<el-row>
			<el-row>
				<el-tabs v-model="responseActiveName" type="card" class="res-tabs">
					<el-tab-pane :label="result.result_code ? map.get(result.result_code) : '尚未发送请求'" name="first">
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
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { apiStore } from '@/store/apis.ts';
import TestRequestTable from '../components/TestRequestTable.vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { executeApi } from '@/api/apis.ts';
import { mock } from '@/api/projects';
import { ElNotification } from 'element-plus';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { VAceEditor } from 'vue3-ace-editor';
// import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';

//ace编辑器配置
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
	},
});
const activeName = ref('first');
const bodyActiveName = ref('bodyFirst');
const responseActiveName = ref('first');

const map = new Map().set(0, 'success').set(1, 'fail');

const requestParams = ref([
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

const apiOperation = apiStore();
const apiInfo = ref(apiOperation.apiInfo);
const result = ref({
	result_code: '',
	result_msg: '',
	result: '',
});

watch(
	apiOperation.apiInfo,
	(newVal, _) => {
		if (newVal != undefined && newVal != null) {
			apiInfo.value = newVal;
			for (let i = 0; i < requestParams.value.length; i++) {
				for (let j = 0; j < apiInfo.value.api_request_params.length; j++) {
					if (requestParams.value[i].type == apiInfo.value.api_request_params[j].type) {
						requestParams.value[i] = apiInfo.value.api_request_params[j];
					}
				}
			}
			apiInfo.value.api_request_params = requestParams;
		}
	},
	{ immediate: true, deep: true }
);
const getInfo = async (thisId: number) => {
	await apiOperation.getApiInfo(thisId);
	apiInfo.value = apiOperation.apiInfo;
};
onBeforeRouteUpdate((to) => {
	getInfo(Number(to.query.api_id));
});

// mock数据，仅限Body-JSON
const executeMock = async () => {
	const res = await mock(JSON.parse(apiOperation.apiInfo.api_request_JSON.JSON_body));
	console.log('res.data', res.data);
	// 将mock好的数据放入requestJSON中
	requestJSON.value = JSON.stringify(res.data, null, 2);
};

// 运行api
const runApi = async () => {
	let requestBody = {
		api_id: apiInfo.value.api_id,
		api_request_params: requestParams.value,
		// 去掉所有的\n和\t
		api_request_JSON: requestJSON.value.replace(/\n/g, '').replace(/\t/g, ''),
	};
	console.log('requestBody', JSON.stringify(requestBody));
	const res = await executeApi(requestBody);
	if (res.data.result_code === 0) {
		result.value.result_code = res.data.result_code;
		result.value.result_msg = res.data.result_msg;
		result.value.result = res.data.data;
		console.log(result.value.result);
		ElNotification({
			title: '成功',
			message: '接口运行成功',
			type: 'success',
		});
	} else {
		result.value.result_code = res.data.result_code;
		result.value.result_msg = res.data.result_msg;
		result.value.result = res.data.data;
		ElNotification({
			title: '失败',
			message: '接口运行失败',
			type: 'error',
		});
	}
};
</script>

<style lang="less" scoped>
.index {
	width: 1000px;

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
		width: 1000px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		span {
			font-size: 20px;
			color: #c0c4cc;
		}
	}
}
</style>
