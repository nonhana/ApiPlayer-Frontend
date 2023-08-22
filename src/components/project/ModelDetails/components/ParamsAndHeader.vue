<template>
	<div>
		<vxe-table
			ref="tableRef"
			border
			show-overflow
			:data="tableData"
			:column-config="{ resizable: true }"
			:menu-config="menuConfig"
			:edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
			@menu-click="contextMenuClickEvent"
		>
			<vxe-column width="200" field="param_name" title="参数名" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="{ row }">
					<vxe-input v-model="row.param_name" type="text"></vxe-input>
				</template>
			</vxe-column>
			<el-table-column prop="type" label="type" width="180" align="center">
				<template #default="scope">
					<input v-model="scope.row.type" type="text" class="ipt" style="width: 100px; text-align: center" />
				</template>
			</el-table-column>
			<el-table-column prop="desc" label="desc" width="180" align="center">
				<template #default="scope">
					<input v-model="scope.row.desc" type="text" class="ipt" style="width: 100px; text-align: center" />
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
		</vxe-table>
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
