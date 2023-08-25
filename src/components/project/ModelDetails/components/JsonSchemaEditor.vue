<template>
	<div id="app">
		<json-schema-editor :value="tree" />
	</div>
</template>

<script setup lang="ts">
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
			if (newVal.root) {
				tree.value.root = newVal.root;
			} else {
				tree.value.root = newVal;
			}
		}
	},
	{ immediate: true, deep: true }
);

watch(
	tree.value,
	(newVal, _) => {
		if (newVal != undefined && newVal != null) {
			emit('sendResponse', newVal);
		}
	},
	{ immediate: true, deep: true }
);
</script>
