<template>
	<div id="app">
		<json-schema-editor :value="tree" disabled="{true}" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
// let tree = ref({
// 	root: {
// 		type: 'object',
// 	},
// });

let tree = ref({
	root: {
		type: 'object',
		title: '条件',
		properties: {
			name: {
				type: 'string',
				title: '名称',
				maxLength: 10,
				minLength: 2,
			},
			appId: {
				type: 'integer',
				title: '应用ID',
			},
			credate: {
				type: 'string',
				title: '创建日期',
				format: 'date',
			},
		},
		required: ['name', 'appId', 'credate'],
	},
});
</script>
