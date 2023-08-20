<template>
	<div class="index">
		<el-row>
			<el-col :span="3">
				<el-select v-model="method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="api_method" /> </el-select
			></el-col>
			<el-col :span="16">
				<el-input v-model="api_url" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="5">
				<el-button type="primary" round size="large" style="margin-left: 20px" @click="runApi">运行</el-button>
				<el-button type="primary" round size="large" @click="saveApi">保存</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<span>请求参数</span>
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
			<span>返回响应</span>
		</el-row>
		<!-- <el-row>
			<el-row>
				<el-tabs v-model="responseActiveName" type="card" class="res-tabs">
					<div v-for="(item, index) in apiInfo.api_response" :key="index">
						<el-tab-pane :label="item.response_name" :name="item.id">
							<div>HTTP状态码：{{ item.http_status }} &nbsp;&nbsp;&nbsp; 响应组件成功名称：{{ item.response_name }}</div>
							<div>sdfg</div>
						</el-tab-pane>
					</div>
				</el-tabs>
			</el-row>
		</el-row> -->
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { apiStore } from '@/store/apis.ts';
// import type { TabsPaneContext } from 'element-plus';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';
import { onBeforeRouteUpdate } from 'vue-router';

const activeName = ref('first');
const bodyActiveName = ref('bodyFirst');

const method = ref('get');
const input = ref('');

const options = [
	{
		value: 'post',
		label: 'post',
	},
	{
		value: 'get',
		label: 'get',
	},
];
const apiOperation = apiStore();
const apiInfo = ref(apiOperation.apiInfo);
let { api_url, api_method } = apiInfo.value;

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
	console.log('todoc', to);
	getInfo(to.query.api_id);
});
// let responseActiveName = apiInfo.value.api_response[0].id;
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
