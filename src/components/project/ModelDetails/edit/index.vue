<template>
	<div class="index">
		<el-row>
			<el-col :span="3">
				<el-select v-model="apiInfo.api_method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-col>
			<el-col :span="14">
				<el-input v-model="apiInfo.api_url" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="7">
				<el-button type="primary" round size="large" style="margin-left: 20px" @click="saveApiInfo">保存</el-button>
				<el-button type="primary" round size="large" @click="runApi">运行</el-button>
				<el-button type="primary" round size="large" @click="deleteApiInfo">删除</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<el-col :span="6"><span style="margin-left: 5px">名称</span></el-col>
			<el-col :span="6"><span style="margin-left: 5px">目录</span></el-col>
			<el-col :span="6"><span style="margin-left: 5px">状态</span></el-col>
			<el-col :span="6"><span style="margin-left: 5px">责任人</span></el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<el-input v-model="apiInfo.api_name" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="apiInfo.dictionary_id" size="large" />
			</el-col>
			<el-col :span="5">
				<el-select v-model="apiInfo.api_status" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
				<!-- <el-input v-model="apiInfo.api_status" size="large" /> -->
			</el-col>
			<el-col :span="6">
				<el-input v-model="apiInfo.api_principal_id" size="large" />
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<el-text class="mx-1" size="large">接口说明</el-text>
		</el-row>
		<el-row>
			<el-input v-model="apiInfo.api_desc" :rows="4" type="textarea" placeholder="Please input" />
		</el-row>
		<el-row style="margin-bottom: 5px">
			<el-text class="mx-1" size="large">请求参数</el-text>
		</el-row>
		<el-row>
			<div v-if="apiInfo.api_request_params">
				<el-tabs v-model="activeName" class="edit-tabs">
					<el-tab-pane label="Parmas" name="first">
						<ParamsAndHeader :requestData="apiInfo.api_request_params[0]"></ParamsAndHeader>
					</el-tab-pane>
					<el-tab-pane label="Body" name="second">
						<el-tabs v-model="bodyActiveName" class="body-tabs">
							<el-tab-pane label="form-data" name="bodyFirst">
								<ParamsAndHeader :requestData="apiInfo.api_request_params[1]"></ParamsAndHeader>
							</el-tab-pane>
							<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
								<ParamsAndHeader :requestData="apiInfo.api_request_params[2]"></ParamsAndHeader>
							</el-tab-pane>
							<el-tab-pane label="json" name="bodyThird">
								<el-input v-model="apiInfo.api_request_JSON" :rows="4" type="textarea" />
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Cookie" name="third">
						<ParamsAndHeader :requestData="apiInfo.api_request_params[3]"></ParamsAndHeader>
					</el-tab-pane>
					<el-tab-pane label="Header" name="fourth">
						<ParamsAndHeader :requestData="apiInfo.api_request_params[4]"></ParamsAndHeader>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-row>
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
			<el-icon style="margin-left: 10px" @click="addResponse">
				<Plus style="margin-top: 5px" />
			</el-icon>
			<el-icon style="margin-left: 10px" @click="deleteResponse">
				<Minus style="margin-top: 5px" />
			</el-icon>
		</el-row>
		<el-row>
			<el-tabs v-model="resActiveName" type="card" class="demo-tabs">
				<div v-for="(item, index) in apiInfo.api_responses" :key="index">
					<el-tab-pane :label="item.response_name" :name="index">
						<el-row>
							<el-col :span="6">HTTP状态码：<el-input v-model="item.http_status" size="large" /></el-col>
							<el-col :span="6" style="margin-left: 20px">响应组件名称<el-input v-model="item.response_name" size="large" /></el-col>
						</el-row>
						<JsonSchemaEditor :responseData="item.response_body" @sendResponse="saveResponse"></JsonSchemaEditor>
					</el-tab-pane>
				</div>
			</el-tabs>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { apiStore } from '@/store/apis.ts';
// const emit = defineEmits(['clickrun']);

// import type { TabsPaneContext } from 'element-plus';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';
import JsonSchemaEditor from '../components/JsonSchemaEditor.vue';
import { useRouter, useRoute } from 'vue-router';
import { updateApi, deleteApi } from '@/api/apis.ts';
import { ElMessageBox, ElMessage } from 'element-plus';
import { onBeforeRouteUpdate } from 'vue-router';
import { treeEmits } from 'element-plus/es/components/tree-v2/src/virtual-tree.js';

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
const method = ref('get');
let activeName = ref('first');
let bodyActiveName = ref('bodyFirst');
let resActiveName = ref(0);

const apiOperation = apiStore();
const apiInfo = ref(apiOperation.apiInfo);
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

const options = [
	{
		value: 'post',
		label: 'post',
	},
	{
		value: 'get',
		label: 'get',
	},
	{
		value: 'put',
		label: 'put',
	},
	{
		value: 'delete',
		label: 'delete',
	},
];

const statusOptions = [
	{
		value: 0,
		label: '开发中',
	},
	{
		value: 1,
		label: '测试中',
	},
	{
		value: 2,
		label: '已发布',
	},
	{
		value: 3,
		label: '将废弃',
	},
];

watch(
	apiOperation.apiInfo,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			apiInfo.value = newVal;
			// console.log('requestParams', requestParams.value.length);

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
const getInfo = async (thisId) => {
	await apiOperation.getApiInfo(thisId);
	apiInfo.value = apiOperation.apiInfo;
};
onBeforeRouteUpdate((to) => {
	getInfo(to.query.api_id);
});

const emit = defineEmits<{
	(event: 'clickrun'): void;
}>();

const runApi = () => {
	emit('clickrun');
};

const saveApiInfo = async () => {
	const saveBody = {
		api_id: apiInfo.value.api_id,
		dictionary_id: apiInfo.value.dictionary_id,
		api_name: apiInfo.value.api_name,
		api_url: apiInfo.value.api_url,
		api_method: apiInfo.value.api_method,
		api_status: apiInfo.value.api_status,
		api_editor_id: apiInfo.value.api_editor_id,
		api_desc: apiInfo.value.api_desc,
		api_request_params: apiInfo.value.api_request_params,
		api_request_JSON: apiInfo.value.api_request_JSON,
		api_responses: apiInfo.value.api_request_JSON,
	};
	const res = await updateApi(saveBody);
	if (res.status == 200) {
		console.log('保存成功');
	} else {
		return Promise.reject(res.msg);
	}
};
const deleteApiInfo = async () => {
	const res = await deleteApi(apiInfo.value.api_id);
	if (res.status == 200) {
		console.log('删除成功');
	} else {
		return Promise.reject(res.msg);
	}
};

const addResponse = () => {
	let obj = {
		response_id: null,
		http_status: null,
		response_name: null,
		response_body: {
			root: {
				type: 'object',
			},
		},
	};
	apiInfo.value.api_responses.push(obj);
};

const deleteResponse = () => {
	apiInfo.value.api_responses.splice(resActiveName.value, 1);
	resActiveName.value--;
};

const saveResponse = (para) => {
	apiInfo.value.api_responses[resActiveName.value].response_body = para;
	// console.log('apiInfo.value.api_responses[resActiveName.value].response_body', apiInfo.value.api_responses[resActiveName.value].response_body);
};
</script>

<style scoped lang="less">
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
}
</style>
