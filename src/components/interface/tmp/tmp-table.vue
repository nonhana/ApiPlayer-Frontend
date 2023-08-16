<template>
	<el-table :data="tableData" stripe style="width: 100%" :editable="true" border>
		<el-table-column prop="date" label="Date" width="180" align="center">
			<template #default="scope">
				<input type="text" v-model="scope.row.date" class="ipt" style="width: 100px; text-align: center" />
			</template>
		</el-table-column>
		<el-table-column prop="name" label="Name" width="180" align="center">
			<template #default="scope">
				<input type="text" v-model="scope.row.name" class="ipt" style="width: 100px; text-align: center" @blur="iptBlur(scope.row, $event)" />
			</template>
		</el-table-column>
		<el-table-column prop="address" label="Address" align="center" width="320">
			<template #default="scope">
				<input type="text" v-model="scope.row.address" class="ipt" style="width: 280px; text-align: center" />
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const tableData = ref([
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
] as any);

//失焦事件，使用事件对象拿到dom元素并进行后续样式的修改
const iptBlur = (value: any, e: any) => {
	// 输入框失焦之后，背景颜色变为粉色
	e.target.style.background = 'pink';
};
</script>

<style lang="less">
// 设置表格中输入框为边框为0
.ipt {
	border: 0px;
}
</style>
