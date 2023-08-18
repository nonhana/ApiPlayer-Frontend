<template>
	<div class="index">
		<el-row>
			<el-col :span="3">
				<el-select v-model="method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> </el-select
			></el-col>
			<el-col :span="14">
				<el-input v-model="apiInfo.api_url" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="7">
				<el-button type="primary" round size="large" style="margin-left: 20px" @click="saveApi">保存</el-button>
				<el-button type="primary" round size="large" @click="runApi">运行</el-button>
				<el-button type="primary" round size="large" @click="deleteApi">删除</el-button>
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
				<el-input v-model="apiInfo.api_name" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="apiInfo.dictionary_id" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="apiInfo.api_status" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="apiInfo.api_principal_id" placeholder="Please input" size="large" />
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
			<el-tabs v-model="activeName" class="edit-tabs">
				<el-tab-pane label="Parmas" name="first">
					<ParamsAndHeader></ParamsAndHeader>
				</el-tab-pane>
				<el-tab-pane label="Body" name="second">
					<el-tabs v-model="bodyActiveName" class="body-tabs">
						<el-tab-pane label="form-data" name="bodyFirst">
							<ParamsAndHeader></ParamsAndHeader>
						</el-tab-pane>
						<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
							<ParamsAndHeader></ParamsAndHeader>
						</el-tab-pane>
					</el-tabs>
				</el-tab-pane>
				<el-tab-pane label="Cookie" name="third">
					<ParamsAndHeader></ParamsAndHeader>
				</el-tab-pane>
				<el-tab-pane label="Header" name="fourth">
					<ParamsAndHeader></ParamsAndHeader>
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
		</el-row>
		<el-row>
			<el-tabs v-model="resActiveName" type="card" class="doc-tabs">
				<div v-for="(item, index) in apiInfo.api_response" :key="index">
					<el-tab-pane :label="item.response_name" :name="item.http_status">
						<JsonSchemaEditor></JsonSchemaEditor>
					</el-tab-pane>
				</div>
			</el-tabs>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { apiStore } from '@/store/apis.ts';
// const emit = defineEmits(['clickrun']);

// import type { TabsPaneContext } from 'element-plus';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';
import JsonSchemaEditor from '../components/JsonSchemaEditor.vue';

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

const emit = defineEmits<{
	(event: 'clickrun'): void;
}>();

const runApi = () => {
	emit('clickrun');
};

// let responseActiveName = apiInfo.value.api_response[0].id;
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
