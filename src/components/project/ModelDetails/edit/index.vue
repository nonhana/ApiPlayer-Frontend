<template>
	<div class="index">
		<el-row>
			<el-col :span="3">
				<el-select v-model="apiInfo.api_method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-col>
			<el-col :span="13">
				<el-input v-model="apiInfo.api_url" placeholder="Please input" size="large" />
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
				<el-input v-model="apiInfo.api_name" size="large" />
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="6">
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
		<el-row></el-row>
		<el-row style="margin-bottom: 5px">
			<el-text class="mx-1" size="large">接口说明</el-text>
		</el-row>
		<el-row>
			<el-col :span="22">
				<el-input v-model="apiInfo.api_desc" :rows="4" type="textarea" placeholder="请输入接口说明" />
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
import { apiStore } from '@/store/apis.ts';
import { useBaseStore } from '@/store/index.ts';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';
import JsonSchemaEditor from '../components/JsonSchemaEditor.vue';
import { updateApi, deleteApi } from '@/api/apis.ts';
import { getUserInfo } from '@/api/users';
import { useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';

let activeName = ref('first');
let bodyActiveName = ref('bodyFirst');
let resActiveName = ref(0);

const route = useRoute();
const baseStore = useBaseStore();
const apiOperation = apiStore();
const apiInfo = ref<any>({});
const apiPrincipalName = ref<string>('');
const gettingInfo = ref<boolean>(false);
const fullscreenLoading = ref<boolean>(false);
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

const JSON_body = ref<object>({
	root: {
		type: 'object',
		properties: {},
	},
});

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

const emit = defineEmits<{
	(event: 'clickrun'): void;
}>();

const runApi = () => {
	emit('clickrun');
};
const saveApiInfo = async () => {
	fullscreenLoading.value = true;
	const saveBody = {
		api_id: apiInfo.value.api_id,
		api_name: apiInfo.value.api_name,
		api_url: apiInfo.value.api_url,
		api_method: apiInfo.value.api_method,
		api_status: apiInfo.value.api_status,
		api_editor_id: apiInfo.value.api_editor_id,
		api_principal_id: apiInfo.value.api_principal_id,
		api_desc: apiInfo.value.api_desc,
		api_request_params: requestParams.value,
		api_request_JSON: JSON.stringify(JSON_body.value),
		api_responses: apiInfo.value.api_responses.map((item: any) => {
			return {
				http_status: Number(item.http_status),
				response_name: item.response_name,
				response_body: JSON.stringify(item.response_body),
			};
		}),
	};
	const res = await updateApi(saveBody);
	console.log(res.data);
	if (res.status == 200) {
		// 保存成功后，重新获取接口信息
		await apiOperation.getApiInfo(apiInfo.value.api_id);
		fullscreenLoading.value = false;
		ElNotification({
			title: '保存成功',
			type: 'success',
		});
	} else {
		fullscreenLoading.value = false;
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
	JSON_body.value = para;
};

watch(
	() => apiOperation.apiInfo,
	async (newV, _) => {
		if (newV) {
			gettingInfo.value = true;
			apiInfo.value = newV;
			// 先将requestParams中的数据清空
			requestParams.value.forEach((item) => {
				item.params_list = [
					{
						param_name: '',
						param_type: 0,
						param_desc: '',
					},
				];
			});
			// 如果有参数，则遍历，将requestParams中的数据替换
			if (newV.api_request_params.length > 0) {
				requestParams.value.forEach((item, index) => {
					newV.api_request_params.forEach((item2: any) => {
						if (item.type == item2.type) {
							requestParams.value[index] = item2;
						}
					});
				});
			}
			JSON_body.value = apiInfo.value.api_request_JSON ? JSON.parse(apiInfo.value.api_request_JSON.JSON_body) : JSON_body.value;
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
			// 获取到当前责任人的名称
			apiPrincipalName.value = (
				await getUserInfo({
					user_id: apiInfo.value.api_principal_id,
				})
			).data.result.userInfo.username;
			gettingInfo.value = false;
		}
	}
);
</script>

<style scoped lang="less">
.index {
	width: 980px;

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
