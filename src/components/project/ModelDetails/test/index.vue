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
				<el-input v-model="apiInfo.api_url" size="large" />
			</el-col>
			<el-col :span="4">
				<el-button type="primary" round size="large" style="margin-left: 20px" @click="runApi">运行</el-button>
				<!-- <el-button type="primary" round size="large" @click="saveApi">保存</el-button> -->
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<span>请求参数</span>
		</el-row>
		<el-row>
			<div>
				<el-tabs v-model="activeName" class="edit-tabs">
					<el-tab-pane label="Parmas" name="first">
						<TestRequestTable :requestData="requestParams[0]" />
					</el-tab-pane>
					<el-tab-pane label="Body" name="second">
						<el-tabs v-model="bodyActiveName" class="body-tabs">
							<el-tab-pane label="form-data" name="bodyFirst">
								<TestRequestTable :requestData="requestParams[1]" />
							</el-tab-pane>
							<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
								<TestRequestTable :requestData="requestParams[2]" />
							</el-tab-pane>
							<el-tab-pane label="json" name="bodyThird">
								<el-input v-model="requestJSON" :rows="4" type="textarea" />
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Cookie" name="third">
						<TestRequestTable :requestData="requestParams[3]" />
					</el-tab-pane>
					<el-tab-pane label="Header" name="fourth">
						<TestRequestTable :requestData="requestParams[4]" />
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-row>
		<el-row>
			<span>返回响应</span>
		</el-row>
		<el-row v-if="result.result_code">
			<el-row>
				<el-tabs v-model="responseActiveName" type="card" class="res-tabs">
					<el-tab-pane :label="map.boolean[result.result_code]" :name="first">
						<div>状态信息：{{ result.result_msg }}</div>
						<div>{{ result.result }}</div>
					</el-tab-pane>
				</el-tabs>
			</el-row>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { apiStore } from '@/store/apis.ts';
// import type { TabsPaneContext } from 'element-plus';
import TestRequestTable from '../components/TestRequestTable.vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { executeApi } from '@/api/apis.ts';

const activeName = ref('first');
const bodyActiveName = ref('bodyFirst');
const responseActiveName = ref('first');

const map = { boolean: { 0: 'success', 1: 'fail' } };

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
let { api_method, api_id } = apiInfo.value;
let api_url = ref(apiInfo.value.api_url);

watch(
	apiOperation.apiInfo,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			apiInfo.value = newVal;
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

const runApi = async () => {
	let requestBody = {
		api_id: apiInfo.value.api_id,
		api_request_params: requestParams.value,
		api_request_JSON: requestJSON.value,
	};
	const res = await executeApi(requestBody);
	if (res.status == 200) {
		result.value.result_code = res.data.result_code;
		result.value.result_msg = res.data.result_msg;
		result.value.result = res.data.result;
	} else {
		return Promise.reject(res.msg);
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
}
</style>
