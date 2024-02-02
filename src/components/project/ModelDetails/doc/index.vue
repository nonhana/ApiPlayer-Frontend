<template>
	<div class="index">
		<el-row class="title">
			<el-text class="mx-1" size="large">{{ apiStore.apiInfo.api_name }}</el-text>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-tag type="" class="mx-1" effect="dark" round size="large">
					{{ apiStore.apiInfo.api_method.toUpperCase() }}
				</el-tag>
				<el-text class="mx-1" size="large" style="padding-left: 2%">{{ apiStore.apiInfo.api_url }}</el-text>
				<el-text class="mx-1" size="large" style="padding-left: 5%">{{ statusMap.get(apiStore.apiInfo.api_status) }}</el-text>
			</el-col>
		</el-row>
		<el-row>
			<el-text class="mx-1">前置url：{{ apiStore.apiInfo.baseUrl }} </el-text>
		</el-row>
		<el-row>
			<el-text class="mx-1">创建时间 {{ timestampToTime(Date.parse(apiStore.apiInfo.api_createdAt)) }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">修改时间 {{ timestampToTime(Date.parse(apiStore.apiInfo.api_editedAt)) }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">修改者 {{ apiEditorName }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">创建者 {{ apiCreatorName }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">责任人 {{ apiPrincipalName === '' ? '未指定' : apiPrincipalName }}</el-text>
			<el-col :span="1"></el-col>
		</el-row>
		<el-divider />
		<el-row>
			<el-text class="mx-1" size="large">接口说明</el-text>
		</el-row>
		<el-row>
			<el-text class="mx-1"> {{ apiStore.apiInfo.api_desc }}</el-text>
		</el-row>
		<el-divider />
		<el-row>
			<el-text class="mx-1" size="large">请求参数</el-text>
		</el-row>
		<div v-if="apiStore.apiInfo.api_request_params.length > 0 || apiStore.apiInfo.api_request_JSON">
			<div v-for="(item, index) in apiStore.apiInfo.api_request_params" :key="index">
				<el-text class="mx-1">{{ map.get(item.type) }}</el-text>
				<el-row>
					<el-table :data="item.params_list" border style="width: 95%">
						<el-table-column prop="param_name" label="name" width="200" />
						<el-table-column prop="param_type" label="type" width="200">
							<template #default="scope">
								{{ requestMap.get(scope.row.param_type) }}
							</template>
						</el-table-column>
						<el-table-column prop="param_desc" label="desc" />
					</el-table>
				</el-row>
				<el-divider />
			</div>
		</div>
		<div v-else class="params-empty">
			<span>{{ emptyRequestWarning }}</span>
		</div>
		<el-divider />
		<el-row>
			<el-text class="mx-1" size="large">请求体(Body-JSON)</el-text>
		</el-row>
		<div v-if="apiStore.apiInfo.api_request_JSON" v-loading="treeBuilding">
			<el-tree default-expand-all :data="treeData" :render-content="renderContent" />
		</div>
		<div v-else class="params-empty">
			<span>暂无请求体信息</span>
		</div>
		<el-divider />
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
		</el-row>
		<div v-if="apiResponses.length > 0">
			<el-tabs v-model="activeName" type="card" class="doc-tabs">
				<div v-for="(item, index) in apiResponses" :key="index">
					<el-tab-pane :label="item.response_name" :name="index">
						<ResponseCard :context="item" />
					</el-tab-pane>
				</div>
			</el-tabs>
		</div>
		<div v-else class="params-empty">
			<span>{{ emptyResponseWarning }}</span>
		</div>
		<div style="height: 20px"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store';
import { getUserInfo } from '@/api/users';
import type { TreeNode } from '@/utils/convertSchemaToTree';
import { convertSchemaToTree } from '@/utils/convertSchemaToTree';
import { ApiResponse } from '@/utils/types';
import ResponseCard from '../components/ResponseCard.vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

const { apiStore } = useStore();

const apiResponses = ref<ApiResponse[]>([]);
const activeName = ref<number>(0);
const apiPrincipalName = ref<string>('');
const apiCreatorName = ref<string>('');
const apiEditorName = ref<string>('');
const treeBuilding = ref<boolean>(false);

const map = new Map().set(0, 'Params').set(1, 'Body(form-data)').set(2, 'Body(x-www-form-unlencoded)').set(3, 'Cookie').set(4, 'Header');
const statusMap = new Map().set(0, '开发中').set(1, '测试中').set(2, '已发布').set(3, '将废弃');
const requestMap = new Map().set(0, 'number').set(1, 'integer').set(2, 'string').set(3, 'array');
const emptyRequestWarning: string = '暂无请求参数';
const emptyResponseWarning: string = '暂无返回响应';

let treeData: TreeNode[] = [];

// 使用h函数来渲染el-tree内部内容
const renderContent = (
	h: any,
	{
		node,
		data,
	}: {
		node: Node;
		data: TreeNode;
	}
) => {
	return h(
		'span',
		{
			class: 'custom-tree-node',
		},
		h(
			'div',
			{
				style: 'display: flex; align-items: center;',
			},
			h(
				'div',
				{
					style: 'background-color: #E4F4FC;padding: 3px 6px;border-radius: 5px;cursor: pointer;',
				},
				h(
					'span',
					{
						style: 'color: #70BCFC',
					},
					node.label === 'root' ? '根节点' : node.label
				)
			),
			h(
				'span',
				{},
				h(
					'span',
					{
						style: 'margin-left: 8px',
					},
					data.type
				),
				h(
					'span',
					{
						style: 'margin-left: 8px; color: #999999;',
					},
					data.title
				),
				h(
					'span',
					{
						style: 'margin-left: 8px; color :#FFB73A',
					},
					data.required ? '必填' : '选填'
				)
			)
		),
		h(
			'span',
			{
				style: 'color: #999999; margin-left: 8px; font-size: 12px;',
			},
			data.description
		)
	);
};
const timestampToTime = (timestamp: number | null) => {
	let date = timestamp ? new Date(timestamp) : new Date();
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
};

watch(
	() => apiStore.apiInfo,
	async (newV, _) => {
		if (newV) {
			apiResponses.value = newV.api_responses;
			// 1. 处理人员名称
			if (newV.api_principal_id) {
				apiPrincipalName.value = (
					await getUserInfo({
						user_id: newV.api_principal_id,
					})
				).result.username;
			}
			apiCreatorName.value = (
				await getUserInfo({
					user_id: newV.api_creator_id,
				})
			).result.username;
			apiEditorName.value = (
				await getUserInfo({
					user_id: newV.api_editor_id,
				})
			).result.username;
			treeBuilding.value = true;
			// 2. 处理请求体：JSON_Schema To TreeNode
			if (newV.api_request_JSON) {
				let rootSchema = JSON.parse(newV.api_request_JSON.JSON_body);
				// 如果有root，将其取出先
				if (rootSchema.root) {
					rootSchema = rootSchema.root;
				}
				treeData = [convertSchemaToTree(rootSchema, 1, 'root')];
			}
			treeBuilding.value = false;
		}
	}
);
</script>

<style scoped lang="less">
.index {
	width: 978px;
	background-color: #fff;

	.title {
		width: 978px;
	}

	.showparent {
		display: flex;
		align-items: center;
	}

	.params-empty {
		width: 98%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f7fa;
		border-radius: 20px;
		color: #999999;
		font-size: 16px;
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

/* el-tree样式 */
:deep(.el-tree-node__content) {
	height: 50px;
}
:deep(.custom-tree-node) {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
</style>
