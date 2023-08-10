<template>
	<div>{{ props.context }}</div>
	<div>lalalalallalalalal</div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
	context: {
		type: Object, // 参数类型
		default: function () {
			return {};
		}, //默认值
		required: true, //是否必传
	},
});
</script>
<style scoped lang="less"></style>
