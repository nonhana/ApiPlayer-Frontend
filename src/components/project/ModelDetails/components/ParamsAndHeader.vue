<template>
	<el-icon @click="handleAddDetails(tableData.length)" v-if="tableData.length == 0">
		<Plus />
	</el-icon>
	<div>
		<el-table :data="tableData" stripe table-layout="auto" style="width: 100%" :editable="true" border>
			<el-table-column prop="param_name" label="name" width="180" align="center">
				<template #default="scope">
					<input v-model="scope.row.param_name" type="text" class="ipt" style="width: 100px; text-align: center" />
				</template>
			</el-table-column>
			<el-table-column prop="param_type" label="type" width="180" align="center">
				<template #default="scope">
					<el-select v-model="scope.row.param_type" class="m-2" placeholder="Select" size="large">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="param_desc" label="desc" width="180" align="center">
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
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';

const props = defineProps<{
	requestData: any;
}>();
const { requestData } = toRefs(props);
let tableData = ref(requestData.value.params_list);
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
	() => props.requestData,
	(newVal, _) => {
		if (newVal != undefined && newVal != null) {
			tableData.value = newVal.params_list;
		}
	},
	{ immediate: true, deep: true }
);

const handleAddDetails = (index: number) => {
	let obj = {
		param_name: '',
		param_type: 0,
		param_desc: '',
	};
	tableData.value.splice(index + 1, 0, obj);
};

// 删除单个行
const handleDelete = (index: number) => {
	tableData.value.splice(index, 1);
};
</script>

<style lang="less">
// 设置表格中输入框为边框为0
.ipt {
	border: 0px;
}
</style>
