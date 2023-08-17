<template>
	<div class="index">
		<el-row class="roww">
			<el-text class="mx-1" size="large">{{ apiInfo.api_name }}</el-text>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-tag type="" class="mx-1" effect="dark" round size="large">
					{{ apiInfo.api_method }}
				</el-tag>
				<el-text class="mx-1" size="large" style="padding-left: 2%">{{ apiInfo.api_url }}</el-text>
				<el-text class="mx-1" size="large" style="padding-left: 5%">{{ apiInfo.api_status }}</el-text>
			</el-col>
		</el-row>
		<el-row>
			<el-text class="mx-1">前置url：{{ apiInfo.api_env_url }} </el-text>
		</el-row>
		<el-row>
			<el-text class="mx-1">创建时间 {{ apiInfo.api_createdAt }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">修改时间 {{ apiInfo.api_editedAt }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">修改者 {{ apiInfo.api_editor_id }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">创建者 {{ apiInfo.api_creator_id }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">责任人 {{ apiInfo.api_principal_id }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">目录 {{ apiInfo.dictionary_id }}</el-text>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-text class="mx-1" size="large">接口说明</el-text>
		</el-row>
		<el-row>
			<el-text class="mx-1"> {{ apiInfo.api_desc }}</el-text>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-text class="mx-1" size="large">请求参数</el-text>
		</el-row>
		<div v-for="(item, index) in apiInfo.api_request_params" :key="index">
			<el-row>{{ item.type }}</el-row>
			<el-row>
				<el-table :data="item.params_list" border style="width: 100%">
					<el-table-column prop="param_name" label="name" />
					<el-table-column prop="param_type" label="type" />
					<el-table-column prop="param_desc" label="desc" />
				</el-table>
			</el-row>
			<el-row></el-row>
		</div>
		<el-row></el-row>
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName" type="card" class="doc-tabs">
				<div v-for="(item, index) in apiInfo.api_response" :key="index">
					<el-tab-pane :label="item.response_name" :name="item.http_status">
						<ResponseCard :context="item"></ResponseCard>
					</el-tab-pane>
				</div>
			</el-tabs>
		</el-row>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import ResponseCard from '../components/ResponseCard.vue';
import { apiStore } from '@/store/apis.ts';

interface Request {
	api_desc: string;
	api_editor_id: number;
	api_env_url: number[];
	api_id: number;
	api_method: string;
	api_name: string;
	api_principal_id: number;
	api_request: ApiRequest[];
	api_response: ApiResponse;
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
// const activeName = ref();

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

// const handleClick = (tab: TabsPaneContext, event: Event) => {
// 	console.log(tab, event);
// };
// const activeName = apiInfo.value.api_response[0].http_status;
</script>

<style lang="less">
.index {
	width: 1000px;

	.roww {
		width: 1000px;
	}

	.showparent {
		display: flex;
		align-items: center;
	}

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
	.deoc-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}
}
</style>
