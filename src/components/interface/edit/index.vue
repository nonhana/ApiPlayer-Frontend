<template>
	<div class="index">
		<el-row>
			<el-col :span="3">
				<el-select v-model="method" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> </el-select
			></el-col>
			<el-col :span="14">
				<el-input v-model="input" placeholder="Please input" size="large" />
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
				<el-input v-model="name" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="path" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="status" placeholder="Please input" size="large" />
			</el-col>
			<el-col :span="6">
				<el-input v-model="response" placeholder="Please input" size="large" />
			</el-col>
		</el-row>
		<el-row style="margin-bottom: 5px">
			<span>接口说明</span>
		</el-row>
		<el-row>
			<el-input v-model="textarea" :rows="4" type="textarea" placeholder="Please input" />
		</el-row>
		<el-row style="margin-bottom: 5px">
			<span>请求参数</span>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName" class="edit-tabs">
				<el-tab-pane label="Parmas" name="first">
					<ParamsAndHeader :requestData="apiInfo.api_request[0].params_list"></ParamsAndHeader>
				</el-tab-pane>
				<el-tab-pane label="Body" name="second">
					<el-tabs v-model="bodyActiveName" type="card" class="body-tabs">
						<el-tab-pane label="form-data" name="bodyFirst">
							<ParamsAndHeader :requestData="apiInfo.api_request[0].params_list"></ParamsAndHeader>
						</el-tab-pane>
						<el-tab-pane label="x-www-form-unlencoded" name="bodySecond">
							<ParamsAndHeader :requestData="apiInfo.api_request[1].params_list"></ParamsAndHeader>
						</el-tab-pane>
					</el-tabs>
				</el-tab-pane>
				<el-tab-pane label="Cookie" name="third">
					<ParamsAndHeader :requestData="apiInfo.api_request[0].params_list"></ParamsAndHeader>
				</el-tab-pane>
				<el-tab-pane label="Header" name="fourth">
					<ParamsAndHeader :requestData="apiInfo.api_request[1].params_list"></ParamsAndHeader>
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<el-row>
			<span>返回响应</span>
		</el-row>
		<el-row>
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
		</el-row>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// import type { TabsPaneContext } from 'element-plus';
import ParamsAndHeader from '../components/ParamsAndHeader.vue';

const activeName = ref('first');
const bodyActiveName = ref('bodyFirst');

const method = ref('get');
const input = ref('');
const name = ref('');
const path = ref('');
const status = ref('');
const response = ref('');
const textarea = ref('');

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
let apiInfo = ref({
	api_name: 'ert',
	api_method: 'options',
	api_url: 'www.baidu.com',
	api_status: 'pending',
	api_createdAt: '2022/2/3',
	api_editedAt: '2023/2/2',
	api_editor_id: 'qq',
	api_creator_id: 'ww',
	api_principal_id: 'ee',
	dictionary_id: 'ewr',
	api_desc: '点击左侧栏某个API后，在右侧主界面获取到该API的详细信息并加以展示。',
	api_env_url: [23454, 2],
	api_request: [
		{
			type: 34,
			params_list: [
				{
					param_name: '写件查细声当',
					param_type: 57,
					param_desc: 'ut',
				},
				{
					param_name: '起七做从',
					param_type: 6,
					param_desc: 'et ad sint cupidatat enim',
				},
			],
		},
		{
			type: 20,
			params_list: [
				{
					param_name: '较头连设',
					param_type: 92,
					param_desc: 'eu',
				},
				{
					param_name: '手准程会素展',
					param_type: 69,
					param_desc: 'dolor dolore voluptate occaecat',
				},
			],
		},
		{
			type: 62,
			params_list: [
				{
					param_name: '根许手',
					param_type: 86,
					param_desc: 'magna sunt cillum irure',
				},
				{
					param_name: '信么志自',
					param_type: 77,
					param_desc: 'ad ipsum in',
				},
				{
					param_name: '水质求军',
					param_type: 92,
					param_desc: 'nulla laboris pariatur in ullamco',
				},
				{
					param_name: '年系业积',
					param_type: 86,
					param_desc: 'anim',
				},
			],
		},
		{
			type: 38,
			params_list: [
				{
					param_name: '阶议方温小院',
					param_type: 75,
					param_desc: 'magna eiusmod ipsum mollit in',
				},
			],
		},
	],
	api_response: [
		{
			http_status: 200,
			response_name: '成功',
			id: 'sdfghjsdfgh',
			response_body: [
				{
					label: 'Level one 1',
					children: [
						{
							label: 'Level two 1-1',
							children: [
								{
									label: 'Level three 1-1-1',
								},
							],
						},
					],
				},
				{
					label: 'Level one 2',
					children: [
						{
							label: 'Level two 2-1',
							children: [
								{
									label: 'Level three 2-1-1',
								},
							],
						},
						{
							label: 'Level two 2-2',
							children: [
								{
									label: 'Level three 2-2-1',
								},
							],
						},
					],
				},
				{
					label: 'Level one 3',
					children: [
						{
							label: 'Level two 3-1',
							children: [
								{
									label: 'Level three 3-1-1',
								},
							],
						},
						{
							label: 'Level two 3-2',
							children: [
								{
									label: 'Level three 3-2-1',
								},
							],
						},
					],
				},
			],
		},
		{
			http_status: 94,
			response_name: '改次品织克党',
			id: 'dfgh',
			response_body: 'esse Lorem Excepteur qui in',
		},
	],
});

let responseActiveName = apiInfo.value.api_response[0].id;
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
