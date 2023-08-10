<template>
	<div class="index">
		<el-row class="roww">
			{{ apiInfo.api_name }}
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
			<span>接口说明</span>
		</el-row>
		<el-row>
			<el-text class="mx-1"> {{ apiInfo.api_desc }}</el-text>
		</el-row>
		<el-row></el-row>
		<el-row>
			<span>请求参数</span>
		</el-row>
		<div v-for="(item, index) in apiInfo.api_request" :key="index">
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
			<span>返回响应</span>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName" type="card" class="doc-tabs" @tab-click="handleClick">
				<div v-for="(item, index) in apiInfo.api_response" :key="index">
					<el-tab-pane :label="item.response_body" :name="item.response_body">
						<ResponseCard :context="item"></ResponseCard>
					</el-tab-pane>
				</div>
			</el-tabs>
		</el-row>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import ResponseCard from '../components/ResponseCard.vue';

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};

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
			response_body: 'success',
		},
		{
			http_status: 94,
			response_name: '改次品织克党',
			response_body: 'esse Lorem Excepteur qui in',
		},
	],
});

const activeName = apiInfo.value.api_response[0].response_body;
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
