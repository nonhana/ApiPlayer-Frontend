<template>
	<div class="index"></div>
	<el-row>
		<el-col :span="4">
			<el-text class="mx-1" type="info">HTTP状态码：{{ props.context.http_status }}</el-text>
		</el-col>
		<el-col :span="4">
			<el-text class="mx-1" type="info">内容格式：JSON</el-text>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="13" class="cardA">
			<el-card class="box-card" shadow="never">
				<template #header>
					<div class="card-header">
						<span>数据结构</span>
						<el-button class="button" text>Operation button</el-button>
					</div>
				</template>
				<div>
					<el-tree default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick" />
				</div>
			</el-card>
		</el-col>
		<el-col :span="11" class="cardB">
			<el-card class="box-card" shadow="never">
				<template #header>
					<div class="card-header">
						<span>示例</span>
						<!-- <el-button class="button" text>Operation button</el-button> -->
					</div>
				</template>
				<div></div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
interface Tree {
	label: string;
	children?: Tree[];
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

const handleNodeClick = (data: Tree) => {
	console.log(data);
};

const data: Tree[] = [
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
];

const defaultProps = {
	children: 'children',
	label: 'label',
};
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
