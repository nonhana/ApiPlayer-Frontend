<template>
	<div>
		<el-table :data="tableData" stripe table-layout="auto" style="width: 100%" :editable="true" border>
			<el-table-column prop="name" label="name" width="180" align="center">
				<template #default="scope">
					<input v-model="scope.row.param_name" type="text" class="ipt" style="width: 100px; text-align: center" />
				</template>
			</el-table-column>
			<el-table-column prop="value" label="value" width="180" align="center">
				<template #default="scope">
					<input v-model="scope.row.param_value" type="text" class="ipt" style="width: 100px; text-align: center" />
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

const props = defineProps({
	requestData: {
		type: Object,
		default() {
			return {};
		},
	},
});
const { requestData } = toRefs(props);
let tableData = ref(requestData.value.params_list);

watch(
	props.requestData,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			requestData.value = newVal;
			// if(JSON.stringify(requestData.value.params_list) == "{}"){
			// 	requestData.value.params_list =

			// }
			console.log('newVal', newVal);
		}
	},
	{ immediate: true, deep: true }
);

//失焦事件，使用事件对象拿到dom元素并进行后续样式的修改
// const iptBlur = (value: any, e: any) => {
// 	// e.target.style.background = 'pink'
// 	let arr = tableData.value;
// 	arr = arr.filter((value) => Object.keys(value).length != 0);
// 	console.log('value', value);
// };

const handleAddDetails = (index) => {
	let obj = {
		name: '',
		type: '',
		desc: '',
	};
	tableData.value.splice(index + 1, 0, obj);
};

// 删除单个行
const handleDelete = (index) => {
	tableData.value.splice(index, 1);
};
</script>

<style lang="less">
// 设置表格中输入框为边框为0
.ipt {
	border: 0px;
}
</style>
