<template>
	<el-row>
		<el-col :span="24">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="文档" name="first"> <Doc></Doc> </el-tab-pane>
				<el-tab-pane label="修改文档" name="second"> <Edit></Edit> </el-tab-pane>
				<el-tab-pane label="运行" name="third"> <Test></Test> </el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import Doc from './doc/index.vue';
import Edit from './edit/index.vue';
import Test from './test/index.vue';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
</script>
<style scoped lang="less">
.el-tabs--border-card {
	min-width: 1000px;

	.el-tabs__nav {
		width: 100%;

		.el-tabs__item {
			height: 30px;
			line-height: 30px;
			width: calc(100% / 7);
		}
	}
}

.demo-tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
