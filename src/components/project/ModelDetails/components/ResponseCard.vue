<template>
	<div class="ResponseCard-wrapper">
		<el-row>
			<div>
				<el-text class="mx-1" type="info">HTTP状态码：{{ context.http_status }}</el-text>
			</div>
			<div>
				<el-text class="mx-1" type="info">内容格式：JSON</el-text>
			</div>
		</el-row>
		<el-row>
			<div class="cardA">
				<el-card class="box-card" shadow="never">
					<template #header>
						<div class="card-header">
							<span>数据结构</span>
						</div>
					</template>
					<div>
						<el-tree default-expand-all :data="treeData" :render-content="renderContent" />
					</div>
				</el-card>
			</div>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { convertSchemaToTree } from '@/utils/convertSchemaToTree';
import { ApiResponse } from '@/utils/types';
import type { TreeNode, SchemaNode } from '@/utils/convertSchemaToTree';
import Node from 'element-plus/es/components/tree/src/model/node';

// 从父组件拿到的数据
const props = defineProps<{
	context: ApiResponse;
}>();

const { context } = toRefs(props);

const treeData = ref<TreeNode[]>([]);

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

watch(
	context,
	(newV, _) => {
		// 拿到之后进行处理
		let rootSchema: SchemaNode;
		if (newV.response_body.root) {
			rootSchema = newV.response_body.root;
		} else {
			rootSchema = newV.response_body;
		}
		treeData.value = [convertSchemaToTree(rootSchema, 1, 'root')];
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.ResponseCard-wrapper {
	width: 100%;
	.cardA {
		width: 100%;
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
