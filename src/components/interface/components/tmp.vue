<template>
	<el-row>
		<el-table :data="requestData" border style="width: 100%">
			<el-table-column prop="param_name" label="name" />
			<el-table-column prop="param_type" label="type" />
			<el-table-column prop="param_desc" label="desc" />
		</el-table>
	</el-row>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
	requestData: {
		type: Object, // 参数类型
		default: function () {
			return {};
		}, //默认值
		required: true, //是否必传
	},
});
</script>
<style scoped lang="less">
div {
	width: 1000px;
}
</style>
