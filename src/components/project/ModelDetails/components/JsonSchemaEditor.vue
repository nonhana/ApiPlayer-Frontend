<template>
	<div class="JsonSchemaEditor-wrapper">
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
	(newV, _) => {
		if (newV !== undefined && newV !== null) {
			if (newV.root) {
				tree.value.root = newV.root;
			} else {
				tree.value.root = newV;
			}
		}
	},
	{ immediate: true, deep: true }
);

watch(
	tree.value,
	(newV, _) => {
		if (newV !== undefined && newV !== null) {
			sendCount.value++;
			emits('sendResponse', newV, sendCount.value);
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

<style scoped lang="less">
.JsonSchemaEditor-wrapper {
	position: relative;
	width: 100%;
}
</style>
