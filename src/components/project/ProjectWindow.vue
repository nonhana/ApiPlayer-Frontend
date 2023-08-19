<template>
	<div>
		<div class="nav_side">接口管理</div>
		<div><component :is="componentId"></component></div>
	</div>
</template>

<script lang="ts" setup>
import ProjectDetails from './ProjectDetails.vue';
import ProjectSettings from './ProjectSettings.vue';
import { ref } from 'vue';

let componentId = ref(ProjectDetails);
</script>
<style lang="less" scoped></style>
