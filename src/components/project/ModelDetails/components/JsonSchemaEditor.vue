<template>
	<div id="app">
		<div>sdfg</div>
		{{ tree }}
		<json-schema-editor :value="tree" />
	</div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';

const props = defineProps({
	responseData: {
		type: String,
		default() {
			return '';
		},
	},
});
const { responseData } = toRefs(props);
// const props = defineProps<{
// 	responseData: {
// 		response_id: number;
// 		http_status: number;
// 		response_body: string;
// 	};
// }>();
let tree = ref();

console.log('tree', tree.value);

watch(
	() => props.responseData,
	(newVal, oldVal) => {
		if (newVal != undefined && newVal != null) {
			// tree.value = JSON.parse(JSON.parse(newVal));
			if (JSON.parse(newVal).root) {
				tree.value = JSON.parse(newVal).root;
			} else {
				tree.value = JSON.parse(newVal);
			}
			// console.log('rootSchema', rootSchema);
			console.log('tree.value', tree.value);
			// console.log('typeof newVal', typeof newVal);
			// console.log('typeof tree.value', typeof tree.value);
		} else {
			let tree = ref({
				root: {
					type: 'object',
				},
			});
		}
	},
	{ immediate: true, deep: true }
);
</script>
