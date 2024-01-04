<template>
	<div class="TestRequestTable-wrapper">
		<el-table :data="tableData" stripe table-layout="auto" style="width: 100%" :editable="true" border>
			<el-table-column prop="name" label="name" width="200" align="center">
				<template #default="scope">
					<input v-model="scope.row.param_name" type="text" class="ipt" style="width: 100px; text-align: center" />
				</template>
			</el-table-column>
			<el-table-column prop="value" label="value" width="500" align="center">
				<template #default="scope">
					<input v-model="scope.row.param_value" type="text" class="ipt" style="width: 100px; text-align: center" />
				</template>
			</el-table-column>
			<el-table-column label="operate" align="center" width="100">
				<template #default="scope">
					<el-icon style="cursor: pointer" @click="handleAddDetails(scope.$index)">
						<Plus />
					</el-icon>
					<el-icon style="margin-left: 10px; cursor: pointer" @click="handleDelete(scope.$index)">
						<Minus />
					</el-icon>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
	requestData: any;
}>();

const requestData = ref(props.requestData);
const tableData = ref(requestData.value.params_list);

const handleAddDetails = (index: number) => {
	let obj = {
		param_name: '',
		param_value: '',
	};
	tableData.value.splice(index + 1, 0, obj);
};
const handleDelete = (index: number) => {
	tableData.value.splice(index, 1);
};

watch(
	props.requestData,
	(newV, _) => {
		if (newV !== undefined && newV !== null) {
			requestData.value = newV;
		}
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.TestRequestTable-wrapper {
	position: relative;
	width: 100%;
	.ipt {
		border: 0px;
	}
}
</style>
