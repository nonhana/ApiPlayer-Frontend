<template>
	<div id="app">
		<json-schema-editor :value="tree" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
let tree = ref({
	root: {
		type: 'object',
	},
});
</script>
