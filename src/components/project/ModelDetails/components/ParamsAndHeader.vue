<template>
	<div class="ParamsAndHeader-wrapper">
		<el-icon v-if="tableData.length === 0" @click="handleAddDetails(tableData.length)">
			<Plus />
		</el-icon>
		<div>
			<el-table :data="tableData" stripe table-layout="auto" style="width: 100%" :editable="true" border>
				<el-table-column prop="param_name" label="name" width="200" align="center">
					<template #default="scope">
						<input v-model="scope.row.param_name" type="text" class="ipt" style="width: 100px; text-align: center" />
					</template>
				</el-table-column>
				<el-table-column prop="param_type" label="type" width="150" align="center">
					<template #default="scope">
						<el-select v-model="scope.row.param_type" class="m-2" placeholder="Select" size="large">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="param_desc" label="desc" width="470" align="center">
					<template #default="scope">
						<input v-model="scope.row.param_desc" type="text" class="ipt" style="width: 100px; text-align: center" />
					</template>
				</el-table-column>
				<el-table-column label="operate" align="center" width="100">
					<template #default="scope">
						<el-icon @click="handleAddDetails(scope.$index)">
							<Plus />
						</el-icon>
						<el-icon style="margin-left: 10px" @click="handleDelete(scope.$index)">
							<Minus />
						</el-icon>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { GlobalParamsList } from '@/api/projects/types';

const props = defineProps<{
	requestData: GlobalParamsList;
}>();

const { requestData } = toRefs(props);

const tableData = ref(requestData.value.params_list);
const options = [
	{
		value: 0,
		label: 'number',
	},
	{
		value: 1,
		label: 'integer',
	},
	{
		value: 2,
		label: 'string',
	},
	{
		value: 3,
		label: 'array',
	},
];

watch(
	requestData,
	(newV, _) => {
		if (newV !== undefined && newV !== null) {
			tableData.value = newV.params_list;
		}
	},
	{ immediate: true, deep: true }
);

const handleAddDetails = (index: number) => {
	const paramItem = {
		param_name: '',
		param_type: 0,
		param_desc: '',
		param_value: '',
	};
	tableData.value.splice(index + 1, 0, paramItem);
};

// 删除单个行
const handleDelete = (index: number) => {
	tableData.value.splice(index, 1);
};
</script>

<style scoped lang="less">
.ParamsAndHeader-wrapper {
	position: relative;
	width: 100%;
	.ipt {
		border: 0px;
	}
}
</style>
