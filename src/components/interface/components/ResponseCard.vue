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
					<el-tree default-expand-all :data="TreeData" @node-click="handleNodeClick" />
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

const TreeData = [
	{
		id: 1,
		label: '一级 1',
		children: [
			{
				id: 4,
				label: '二级 1-1',
				children: [
					{
						id: 9,
						label: '三级 1-1-1',
					},
					{
						id: 10,
						label: '三级 1-1-2',
					},
				],
			},
		],
	},
	{
		id: 2,
		label: '一级 2',
		children: [
			{
				id: 5,
				label: '二级 2-1',
			},
			{
				id: 6,
				label: '二级 2-2',
			},
		],
	},
	{
		id: 3,
		label: '一级 3',
		children: [
			{
				id: 7,
				label: '二级 3-1',
			},
			{
				id: 8,
				label: '二级 3-2',
			},
		],
	},
];

const handleNodeClick = (data: Tree) => {
	console.log(data);
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
