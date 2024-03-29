<template>
	<div class="index">
		<el-row>
			<el-col :span="3">
				<el-select v-model="basicInfo.api_method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-col>
			<el-col :span="13">
				<el-input v-model="basicInfo.api_url" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="7">
				<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" round size="large" style="margin-left: 20px" @click="saveApiInfo"
					>保存</el-button
				>
				<el-button type="primary" round size="large" @click="runApi">运行</el-button>
				<el-button type="primary" round size="large" @click="deleteApiInfo">删除</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<el-col :span="7"><span style="margin-left: 5px">名称</span></el-col>
			<el-col :span="6"><span style="margin-left: 5px">状态</span></el-col>
			<el-col :span="6"><span style="margin-left: 5px">责任人</span></el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<el-input v-model="basicInfo.api_name" size="large" />
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="6">
				<el-select v-model="basicInfo.api_status" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-select v-model="basicInfo.api_principal_id" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in candidateList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-col>
		</el-row>
		<el-row></el-row>
		<el-row style="margin-bottom: 5px">
			<el-text class="mx-1" size="large">接口说明</el-text>
		</el-row>
		<el-row>
			<el-col :span="22">
				<el-input v-model="basicInfo.api_desc" :rows="4" type="textarea" placeholder="请输入接口说明" />
			</el-col>
		</el-row>
		<el-row></el-row>
		<el-row style="margin-bottom: 5px">
			<el-text class="mx-1" size="large">请求参数</el-text>
		</el-row>
		<el-row>
			<div v-if="apiInfo.api_request_params" v-loading="gettingInfo">
				<el-tabs v-model="activeName" class="edit-tabs">
					<el-tab-pane label="Params" name="first">
						<ParamsAndHeader :request-data="requestParams[0]"></ParamsAndHeader>
					</el-tab-pane>
					<el-tab-pane label="Body" name="second">
						<el-tabs v-model="bodyActiveName" class="body-tabs">
							<el-tab-pane label="form-data" name="bodyFirst">
								<ParamsAndHeader :request-data="requestParams[1]"></ParamsAndHeader>
							</el-tab-pane>
							<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
								<ParamsAndHeader :request-data="requestParams[2]"></ParamsAndHeader>
							</el-tab-pane>
							<el-tab-pane label="json" name="bodyThird">
								<JsonSchemaEditor style="width: 920px" :response-data="JSON_body" @send-response="saveRequest" />
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Cookie" name="third">
						<ParamsAndHeader :request-data="requestParams[3]"></ParamsAndHeader>
					</el-tab-pane>
					<el-tab-pane label="Header" name="fourth">
						<ParamsAndHeader :request-data="requestParams[4]"></ParamsAndHeader>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-row>
		<el-row></el-row>
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
					<JsonSchemaEditor style="width: 920px" :response-data="item.response_body" @send-response="saveResponse" />
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { updateApi, deleteApi } from '@/api/apis';
import type { UpdateApiReq } from '@/api/apis/types';
import type { RequestParams } from '@/utils/types';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';
import JsonSchemaEditor from '../components/JsonSchemaEditor.vue';
import { ElNotification } from 'element-plus';
import { ApiDetailInfo } from '@/api/apis/types';

const route = useRoute();
const { baseStore, apiStore } = useStore();

const emit = defineEmits<{
	(event: 'clickrun'): void;
}>();

const activeName = ref('first');
const bodyActiveName = ref('bodyFirst');
const resActiveName = ref(0);
const apiInfo = ref<ApiDetailInfo>(apiStore.apiInfo);
const gettingInfo = ref<boolean>(false);
const fullscreenLoading = ref<boolean>(false);
const editedBasicInfo = ref<boolean>(false);
const editBasicInfoCount = ref<number>(0);
const editedResponse = ref<boolean>(false);
const editedParams = ref<boolean>(false);
const editParamsCount = ref<number>(0);
const editedJSON = ref<boolean>(false);
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
const basicInfo = ref({
	api_url: '',
	api_name: '',
	api_method: '',
	api_status: 0,
	api_editor_id: 0,
	api_principal_id: 0,
	api_desc: '',
});
const JSON_body = ref<any>({
	root: {
		type: 'object',
		properties: {},
	},
});
const candidateList = ref<
	{
		label: string;
		value: number;
	}[]
>([]);

const options = [
	{
		value: 'POST',
		label: 'POST',
	},
	{
		value: 'GET',
		label: 'GET',
	},
	{
		value: 'PUT',
		label: 'PUT',
	},
	{
		value: 'DELETE',
		label: 'DELETE',
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

const runApi = () => {
	emit('clickrun');
};
const saveApiInfo = async () => {
	fullscreenLoading.value = true;
	const saveBody: UpdateApiReq = {
		project_id: Number(route.params.project_id), // 默认参数：项目id
		api_id: apiInfo.value.api_id, // 默认参数：接口id
	};

	// 如果某部分有修改，则将修改的数据保存到saveBody中
	if (editedBasicInfo.value) saveBody.basic_info = basicInfo.value;
	if (editedParams.value) saveBody.api_request_params = requestParams.value;
	if (editedJSON.value) saveBody.api_request_JSON = JSON.stringify(JSON_body.value);
	if (editedResponse.value) {
		saveBody.api_responses = apiInfo.value.api_responses.map((item) => {
			return {
				response_id: item.response_id,
				http_status: Number(item.http_status),
				response_name: item.response_name,
				response_body: JSON.stringify(item.response_body),
			};
		});
	}

	const res = await updateApi(saveBody);

	if (res.result_code === 0) {
		// 保存成功后，重新获取接口信息
		await apiStore.getApiInfo(apiInfo.value.api_id);
		fullscreenLoading.value = false;
		ElNotification({
			title: '保存成功',
			type: 'success',
		});
	} else {
		fullscreenLoading.value = false;
		ElNotification({
			title: '未检测到修改内容',
			type: 'info',
		});
	}
};
const deleteApiInfo = async () => {
	await deleteApi({ api_id: apiInfo.value.api_id, project_id: Number(route.params.project_id) });
};
const addResponse = () => {
	let obj = {
		http_status: 200,
		response_name: '响应名称',
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
const saveResponse = (value: any, count: number) => {
	apiInfo.value.api_responses[resActiveName.value].response_body = value;
	if (count > 1) editedResponse.value = true;
};
const saveRequest = (value: any, count: number) => {
	JSON_body.value = value;
	if (count > 1) editedJSON.value = true;
};

watch(
	() => apiStore.apiInfo,
	async (newV, _) => {
		if (newV) {
			gettingInfo.value = true;
			apiInfo.value = newV;

			// 1. 处理basicInfo中的数据
			basicInfo.value = {
				api_url: newV.api_url,
				api_name: newV.api_name,
				api_method: newV.api_method,
				api_status: newV.api_status,
				api_editor_id: newV.api_editor_id,
				api_principal_id: newV.api_principal_id,
				api_desc: newV.api_desc,
			};

			// 2. 处理requestParams中的数据
			// 2.1 先将requestParams中的数据清空
			requestParams.value.forEach((item) => {
				item.params_list = [
					{
						param_name: '',
						param_type: 0,
						param_desc: '',
					},
				];
			});
			// 2.2 如果有参数，则遍历，将requestParams中的数据替换
			if (newV.api_request_params.length > 0) {
				requestParams.value.forEach((item, index) => {
					newV.api_request_params.forEach((item2) => {
						if (item.type === item2.type) {
							requestParams.value[index] = item2;
						}
					});
				});
			}

			// 3. 处理JSON_body中的数据
			JSON_body.value = apiInfo.value.api_request_JSON ? JSON.parse(apiInfo.value.api_request_JSON.JSON_body) : JSON_body.value;
			// 3.1 如果JSON_body中的数据不符合要求，则将其转换为符合要求的数据
			if (!JSON_body.value.root) {
				JSON_body.value = {
					root: JSON_body.value,
				};
			}
			if (!JSON_body.value.root.type) {
				JSON_body.value = {
					root: {
						type: 'object',
						properties: {},
					},
				};
			}

			// 获取到当前项目的成员列表
			candidateList.value = baseStore.teamDetailedInfo.project_list
				.find((item) => item.project_id === Number(route.params.project_id))!
				.project_member_list.map((item) => {
					return {
						label: item.user_name,
						value: item.user_id,
					};
				});
			gettingInfo.value = false;
		}
	}
);

// 检测basicInfo中的数据是否被修改
watch(
	basicInfo,
	() => {
		editBasicInfoCount.value++;
		if (editBasicInfoCount.value > 1) editedBasicInfo.value = true;
	},
	{ deep: true }
);

// 检测requestParams中的数据是否被修改
watch(
	requestParams,
	() => {
		editParamsCount.value++;
		if (editParamsCount.value > 1) editedParams.value = true;
	},
	{ deep: true }
);

// 每次切换路由时，将修改状态重置
watch(
	() => route.query.api_id,
	() => {
		editedBasicInfo.value = false;
		editBasicInfoCount.value = 0;
		editedResponse.value = false;
		editedParams.value = false;
		editParamsCount.value = 0;
		editedJSON.value = false;
	}
);
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
}
</style>
