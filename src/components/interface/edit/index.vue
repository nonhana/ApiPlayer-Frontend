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
			<el-input v-model="textarea" :rows="8" type="textarea" placeholder="Please input" />
		</el-row>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

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

function saveApi() {}

function runApi() {}

function deleteApi() {}
</script>

<style lang="less">
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
}
</style>
