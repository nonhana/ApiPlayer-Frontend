<template>
	<div id="app">
		<json-schema-editor :value="tree" />
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = withDefaults(
	defineProps<{
		responseData: any;
	}>(),
	{
		responseData: {},
	}
);

const emits = defineEmits<{
	(e: 'sendResponse', value: any, count: number): void;
}>();

const tree = ref<any>({});
const sendCount = ref<number>(0);

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
			sendCount.value++;
			emits('sendResponse', newVal, sendCount.value);
		}
	},
	{ immediate: true, deep: true }
);

watch(
	() => route.query.api_id,
	() => {
		sendCount.value = -1;
	},
	{ immediate: true, deep: true }
);
</script>
