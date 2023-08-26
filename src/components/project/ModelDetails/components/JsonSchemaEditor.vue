<template>
	<div id="app">
		<json-schema-editor :value="tree" />
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
let tree = ref<any>({});
const emit = defineEmits(['sendResponse']);
const props = defineProps({
	responseData: {
		type: Object,
		default() {
			return {};
		},
	},
});

watch(
	() => props.responseData,
	(newVal, _) => {
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
