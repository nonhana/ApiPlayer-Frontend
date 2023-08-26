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

			<el-col :span="6"><span style="margin-left: 5px">状态</span></el-col>
			<el-col :span="6"><span style="margin-left: 5px">责任人</span></el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<el-input v-model="apiInfo.api_name" size="large" />
			</el-col>

			<el-col :span="5">
				<el-select v-model="apiInfo.api_status" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-select v-model="apiInfo.api_principal_id" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in candidateList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
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
					<el-tab-pane label="Params" name="first">
						<ParamsAndHeader :request-data="apiInfo.api_request_params[0]"></ParamsAndHeader>
					</el-tab-pane>
					<el-tab-pane label="Body" name="second">
						<el-tabs v-model="bodyActiveName" class="body-tabs">
							<el-tab-pane label="form-data" name="bodyFirst">
								<ParamsAndHeader :request-data="apiInfo.api_request_params[1]"></ParamsAndHeader>
							</el-tab-pane>
							<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
								<ParamsAndHeader :request-data="apiInfo.api_request_params[2]"></ParamsAndHeader>
							</el-tab-pane>
							<el-tab-pane label="json" name="bodyThird">
								<JsonSchemaEditor :response-data="requestJSON" @send-response="saveRequest" />
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Cookie" name="third">
						<ParamsAndHeader :request-data="apiInfo.api_request_params[3]"></ParamsAndHeader>
					</el-tab-pane>
					<el-tab-pane label="Header" name="fourth">
						<ParamsAndHeader :request-data="apiInfo.api_request_params[4]"></ParamsAndHeader>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-row>
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
			<el-icon style="margin-left: 10px; cursor: pointer" @click="addResponse">
				<Plus style="margin-top: 5px" />
			</el-icon>
			<el-icon style="margin-left: 10px; cursor: pointer" @click="deleteResponse">
				<Minus style="margin-top: 5px" />
			</el-icon>
		</el-row>
		<el-row>
			<el-tabs v-model="resActiveName" type="card" class="demo-tabs">
				<el-tab-pane v-for="(item, index) in apiInfo.api_responses" :key="index" :label="item.response_name" :name="index">
					<el-row>
						<el-col :span="6">HTTP状态码：<el-input v-model="item.http_status" size="large" /></el-col>
						<el-col :span="6" style="margin-left: 20px">响应组件名称<el-input v-model="item.response_name" size="large" /></el-col>
					</el-row>
					<JsonSchemaEditor :response-data="item.response_body" @send-response="saveResponse" />
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { apiStore } from '@/store/apis.ts';
import { useBaseStore } from '@/store/index.ts';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';
import JsonSchemaEditor from '../components/JsonSchemaEditor.vue';
import { updateApi, deleteApi } from '@/api/apis.ts';
import { useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';

let activeName = ref('first');
let bodyActiveName = ref('bodyFirst');
let resActiveName = ref(0);

const route = useRoute();
const baseStore = useBaseStore();
const apiOperation = apiStore();
const apiInfo = ref<any>(apiOperation.apiInfo);
interface RequestParams {
	type: number;
	params_list: Array<{
		param_name: string;
		param_type: number;
		param_desc: string;
	}>;
}
const requestParams = ref<RequestParams[]>([
	{
		type: 0,
		params_list: [
			{
				param_name: '',
				param_type: 0,
				param_desc: '',
			},
		],
	},
	{
		type: 1,
		params_list: [
			{
				param_name: '',
				param_type: 0,
				param_desc: '',
			},
		],
	},
	{
		type: 2,
		params_list: [
			{
				param_name: '',
				param_type: 0,
				param_desc: '',
			},
		],
	},
	{
		type: 3,
		params_list: [
			{
				param_name: '',
				param_type: 0,
				param_desc: '',
			},
		],
	},
	{
		type: 4,
		params_list: [
			{
				param_name: '',
				param_type: 0,
				param_desc: '',
			},
		],
	},
]);
const candidateList = ref<
	{
		label: string;
		value: number;
	}[]
>([]);

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

const requestJSON = ref({
	root: {
		type: 'object',
		properties: {},
	},
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
			if (newVal.api_request_JSON && newVal.api_request_JSON.root) {
				requestJSON.value.root = newVal.api_request_JSON.root;
			}
		}
	},
	{ immediate: true, deep: true }
);
watch(
	() => route.query.api_id,
	async (newV, _) => {
		if (newV) {
			await apiOperation.getApiInfo(Number(newV));
			apiInfo.value = apiOperation.apiInfo;
		}
	},
	{ immediate: true, deep: true }
);

const emit = defineEmits<{
	(event: 'clickrun'): void;
}>();

const runApi = () => {
	emit('clickrun');
};

const saveApiInfo = async () => {
	const saveBody = {
		api_id: apiInfo.value.api_id,
		api_name: apiInfo.value.api_name,
		api_url: apiInfo.value.api_url,
		api_method: apiInfo.value.api_method,
		api_status: apiInfo.value.api_status,
		api_editor_id: apiInfo.value.api_editor_id,
		api_desc: apiInfo.value.api_desc,
		api_request_params: apiInfo.value.api_request_params,
		api_request_JSON: requestJSON.value,
		api_responses: apiInfo.value.api_responses.map((item: any) => {
			return {
				http_status: Number(item.http_status),
				response_name: item.response_name,
				response_body: JSON.stringify(item.response_body),
			};
		}),
	};
	console.log('saveBody', saveBody);
	const res = await updateApi(saveBody);
	console.log(res.data);
	if (res.status == 200) {
		// 保存成功后，重新获取接口信息
		await apiOperation.getApiInfo(apiInfo.value.api_id);
		ElNotification({
			title: '保存成功',
			type: 'success',
		});
	} else {
		return Promise.reject();
	}
};
const deleteApiInfo = async () => {
	const res = await deleteApi(apiInfo.value.api_id);
	if (res.status == 200) {
		console.log('删除成功');
	} else {
		return Promise.reject();
	}
};

const addResponse = () => {
	let obj = {
		http_status: null,
		response_name: null,
		response_body: {
			root: {
				type: 'object',
			},
		},
	};
	apiInfo.value.api_responses.push(obj);
	// 切换到新增的响应
	resActiveName.value = apiInfo.value.api_responses.length - 1;
};

const deleteResponse = () => {
	apiInfo.value.api_responses.splice(resActiveName.value, 1);
	resActiveName.value--;
};

const saveResponse = (para: any) => {
	apiInfo.value.api_responses[resActiveName.value].response_body = para;
};

const saveRequest = (para: any) => {
	requestJSON.value = para;
};

onMounted(async () => {
	// 获取到当前项目的成员列表
	candidateList.value = baseStore.teamDetailedInfo.project_list
		.find((item) => item.project_id === Number(route.params.project_id))!
		.project_member_list.map((item) => {
			return {
				label: item.user_name,
				value: item.user_id,
			};
		});
});
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
