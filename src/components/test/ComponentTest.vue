<template>
	<div class="bar">
		<h1>{{ count }}</h1>

		<h2 class="msg">{{ msg }}</h2>

		<h2 class="name">{{ props.name }}</h2>
		<button @click="handle">CLick</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
	name: {
		type: String,
		default: 'name',
	},
});
let count = ref<number>(0);
let msg = ref<string>('hello');
const handle = () => {
	count.value++;
};
</script>
