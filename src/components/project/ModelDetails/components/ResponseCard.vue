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
					<el-tree default-expand-all :data="TreeData" @node-click="handleNodeClick" />
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

interface Tree {
	label: string;
	children?: Tree[];
}
// 前端拿来渲染的树形结构
interface TreeNode {
	id: number;
	label: string;
	type: string;
	required: boolean;
	description: string;
	children?: TreeNode[];
	[key: string]: any;
}
// 后端传过来的JSON_Schema结构
interface SchemaNode {
	type: string;
	title: string;
	description?: string;
	required?: string[];
	properties?: { [key: string]: SchemaNode };
}

const props = defineProps({
	context: {
		type: Object, // 参数类型
		default: function () {
			return {};
		}, //默认值
		required: true, //是否必传
	},
});

let TreeData: TreeNode[] = [];

const handleNodeClick = (data: Tree) => {
	console.log(data);
};
// 将后端传过来的JSON_Schema结构转换成前端需要的树形结构
function convertSchemaToTree(schema: SchemaNode, parentId: number): TreeNode {
	const treeNode: TreeNode = {
		id: parentId,
		label: schema.title,
		type: schema.type,
		required: false,
		description: schema.description || '',
		children: [],
	};

	if (schema.required) {
		schema.required.forEach((prop) => {
			const propertySchema = schema.properties?.[prop];
			if (propertySchema) {
				const childNode = convertSchemaToTree(propertySchema, parentId * 10 + 1);
				childNode.required = true;
				treeNode.children.push(childNode);
			}
		});
	}

	return treeNode;
}

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
		TreeData = [convertSchemaToTree(rootSchema, 1)];
		console.log(TreeData);
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
</style>
