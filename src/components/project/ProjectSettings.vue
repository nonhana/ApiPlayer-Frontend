<template>
	<div class="container">
		<SideNav></SideNav>
		<Settings></Settings>
	</div>
</template>

<script setup lang="ts">
import SideNav from '../project/ModelSettings/SideNav.vue';
import Settings from './ModelSettings/Settings.vue';
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-evenly;
}
</style>
