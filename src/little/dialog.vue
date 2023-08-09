<template>
	<el-dialog
		v-model="dialogFormVisible"
		:before-close="dialogBeforeCloseFn"
		align-center="true"
		style="position: relative; width: 640px; height: 500px; opacity: 1; background: #ffffff; border-radius: 10px"
		:fullscreen="false"
		size="1350px"
		class="form-container"
	>
		<div class="title" style="">{{ props.title }}</div>
		<el-form :model="form" style="">
			<el-form-item :label-width="formLabelWidth" style="">
				<el-input v-model="form.teamName" autocomplete="on" autofocus="true" :placeholder="props.inputPlaceholder" text class="form-input" style="" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="clickHandler"> {{ props.buttonName }} </el-button>
			</span>
		</template>
	</el-dialog>
	<!-- </div> -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const props = defineProps<{
	closeWindow?: () => void;
	title: string;
	buttonName: string;
	inputPlaceholder: string;
}>();

const dialogFormVisible = ref(true);
const formLabelWidth = '140px';

const form = reactive({
	teamName: '',
});

const clickHandler = () => {
	// dialogFormVisible.value = false;
	// 新建团队接口调用
	// closeTeamWindow();
	props.closeWindow!();
};

const dialogBeforeCloseFn = () => {
	// console.log(222);
	props.closeWindow!();
};
</script>
<style scoped>
.form-container {
	position: relative;
	width: 640px;
	height: 500px;
	opacity: 1;

	background: #ffffff;
}

.title {
	position: absolute;
	width: 640px;
	height: 88px;
	left: 0px;
	top: 86px;
	font-family: Source Han Sans CN;
	font-size: 36px;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0px;
	color: #3d3d3d;
}

.el-form {
	position: absolute;
	left: -4px;
	top: 194px;
	width: 640px;
	height: 113px;
	opacity: 1;

	display: flex;
	flex-direction: column;
}
.modal {
	position: fixed;
	/* background-color: #e81515; */
	background-color: rgba(0, 0, 0, 0.5);
	left: 0;
	top: 0;
	width: 1350px;
	height: 100vh;
	z-index: 10;
}
.el-form-item {
	position: static;
	left: 58px;
	top: 14px;
	width: 524px;
	height: 85px;
	opacity: 1;

	/* 自动布局 */
	display: flex;
	flex-direction: column;
	padding: 0px;
	flex-grow: 1;
	align-self: stretch;

	z-index: 0;
}
.el-button--text {
	text-align: center;
}
.el-input {
	text-overflow: ellipsis;

	position: static;
	left: 0px;
	top: 0px;
	width: 524px;
	height: 63px;
	opacity: 1;
	text-align: center;
	/* 自动布局 */
	display: flex;
	flex-direction: column;
	padding: 0px;
	gap: 8px;
	align-self: stretch;
	color: #767676;
	font-family: Source Han Sans CN;
	font-size: 18px;
	font-weight: normal;
}
.dialog-footer {
	position: absolute;
	left: 0px;
	top: 306px;
	width: 640px;
	height: 115px;
	opacity: 1;
}
.dialog-footer button:first-child {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 8px;
	width: 274px;
	height: 69px;
	border-radius: 6px;
	opacity: 1;
	font-family: Source Han Sans CN;
	font-size: 24px;
	font-weight: normal;
	letter-spacing: 0.34em;
	background: rgba(89, 168, 185, 0.6);
}
</style>
<style>
.dialog-mask {
	margin-left: 50%;
	transform: translateX(-50%);
	width: 1350px;
	background-color: #e10d0d;
}
</style>
