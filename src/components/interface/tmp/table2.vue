<template>
	<el-table :data="state.tableList">
		<el-table-column label="说明" align="center" prop="describe">
			<template #default="scope">
				<!-- 判断为编辑状态 -->
				<el-input
					v-if="state.tableRowEditIndex === scope.$index && state.tableColumnEditIndex == scope.column.id"
					ref="tableRowInputRef"
					v-model="scope.row.param_name"
					@keyup.enter="
						($event) => {
							$event.target.blur();
						}
					"
					@blur="onInputTableBlur(scope)"
				/>
				<!-- 判断为显示状态 -->
				<p v-else class="eidt-row-p" @dblclick="dbClickCell(scope)">
					{{ scope.row.param_name }}
				</p>
			</template>
		</el-table-column>
		<el-table-column label="复核状态" prop="checkStateAr">
			<template #default="scope">
				<el-select v-model="scope.row.checkStateAr" placeholder="复核状态" @change="onInputTableBlur(scope)">
					<el-option v-for="item in reviewStatus" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue';
const tableRowInputRef: any = ref(null);
const reviewStatus = [
	{
		value: 0,
		label: '未开始',
	},
	{
		value: 1,
		label: '正确',
	},
	{
		value: 2,
		label: '错误',
	},
]; // 复核状态
const state = reactive({
	tableList: [
		{
			param_name: '写件查细声当',
			param_type: 57,
			param_desc: 'ut',
		},
		{
			param_name: '起七做从',
			param_type: 6,
			param_desc: 'et ad sint cupidatat enim',
		},
	], // 表单数据
	// 编辑的表格行
	tableRowEditIndex: undefined,
	// 编辑的表格列
	tableColumnEditIndex: undefined,
});
// 双击可编辑的单元格
const dbClickCell = (scope: any) => {
	console.log(scope);
	// 找到单个格子独有的属性 - 这里是用所在行跟列id区别显示
	state.tableRowEditIndex = scope.$index;
	state.tableColumnEditIndex = scope.column.id;
	nextTick(() => {
		// 获取焦点
		tableRowInputRef.value.focus();
	});
};
// 表格中input取消焦点,select变化
const onInputTableBlur = (scope: any) => {
	console.log('取消焦点', scope);
	state.tableRowEditIndex = undefined;
	state.tableColumnEditIndex = undefined;
	const id = scope.row.id;
	const key = scope.column.property;
	const value = scope.row[key];
	// 更新给后端的数据接口
	// 提交数据........
};
</script>
<style lang="less" scoped>
.eidt-row-p {
	width: 100%;
	height: 32px;
	line-height: 32px;
	text-align: center;
	margin: 0;
}
</style>
