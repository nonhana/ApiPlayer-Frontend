<template>
	<div id="app">
		<json-schema-editor :value="tree" />
	</div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
let tree = ref({
	root: {
		type: 'object',
		properties: {},
	},
});
const emit = defineEmits(['sendResponse']);
const props = defineProps({
	responseData: {
		type: Object,
		default() {
			return {};
		},
	},
});
const { responseData } = toRefs(props);

watch(
	() => props.responseData,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			// tree.value = JSON.parse(JSON.parse(newVal));
			if (newVal.root) {
				tree.value.root = newVal.root;
			} else {
				tree.value.root = newVal;
			}
			// console.log('rootSchema', rootSchema);
			console.log('tree.value', tree.value);
			// console.log('typeof newVal', typeof newVal);
			console.log('typeof tree.value', typeof tree.value);
		}
	},
	{ immediate: true, deep: true }
);

watch(
	tree.value,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			emit('sendResponse', newVal);
		}
	},
	{ immediate: true, deep: true }
);
</script>
