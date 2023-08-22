<template>
	<div class="index"></div>
	<el-row>
		<el-col :span="5">
			<el-text class="mx-1" type="info">HTTP状态码：{{ props.context.http_status }}</el-text>
		</el-col>
		<el-col :span="5">
			<el-text class="mx-1" type="info">内容格式：JSON</el-text>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="13" class="cardA">
			<el-card class="box-card" shadow="never">
				<template #header>
					<div class="card-header">
						<span>数据结构</span>
					</div>
				</template>
				<div>
					<el-tree default-expand-all :data="treeData" :render-content="renderContent" @node-click="handleNodeClick" />
				</div>
			</el-card>
		</el-col>
		<el-col :span="11" class="cardB">
			<el-card class="box-card" shadow="never">
				<template #header>
					<div class="card-header">
						<span>示例</span>
						<el-button class="button" text>Operation button</el-button>
					</div>
				</template>
				<div></div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

// 前端拿来渲染的树形结构
interface TreeNode {
	id: number;
	label: string;
	type: string;
	required: boolean;
	title: string;
	description: string;
	children?: TreeNode[];
	[key: string]: any; // Allow additional properties
}
// 后端传过来的JSON_Schema结构
interface SchemaNode {
	type: string;
	title: string;
	description?: string;
	required?: string[];
	properties?: { [key: string]: SchemaNode };
}

// 从父组件拿到的数据
const props = defineProps<{
	context: {
		response_id: number;
		http_status: number;
		response_body: string;
	};
}>();

let treeData: TreeNode[] = [];

const handleNodeClick = (data: TreeNode) => {
	console.log(data);
};
// 将后端传过来的JSON_Schema结构转换成前端需要的树形结构
const convertSchemaToTree = (schema: SchemaNode, parentId: number, labelName: string): TreeNode => {
	const treeNode: TreeNode = {
		id: parentId,
		label: labelName,
		title: schema.title,
		type: schema.type,
		required: false,
		description: schema.description || '',
		children: [],
	};
	if (schema.required) {
		schema.required.forEach((prop) => {
			const propertySchema = schema.properties?.[prop];
			if (propertySchema) {
				const childNode = convertSchemaToTree(propertySchema, parentId * 10 + 1, prop);
				childNode.required = true;
				treeNode.children!.push(childNode);
			}
		});
	}

	return treeNode;
};
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
					node.label
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

watch(
	() => props.context,
	(newV, _) => {
		// 拿到之后进行处理
		let rootSchema: SchemaNode;
		if (JSON.parse(newV.response_body).root) {
			rootSchema = JSON.parse(newV.response_body).root;
		} else {
			rootSchema = JSON.parse(newV.response_body);
		}
		treeData = [convertSchemaToTree(rootSchema, 1, 'root')];
		console.log(treeData);
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.index {
	width: 1000px;
	.cardA {
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.text {
			font-size: 14px;
		}
		.item {
			margin-bottom: 18px;
		}
		.box-card {
			height: 100%;
			width: 100%;
		}
	}
	.cardB {
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.text {
			font-size: 14px;
		}
		.item {
			margin-bottom: 18px;
		}
		.box-card {
			width: 100%;
			height: 100%;
		}
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
