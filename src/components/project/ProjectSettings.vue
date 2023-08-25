<template>
	<div class="main">
		<div class="container">
			<SideNav></SideNav>
			<settings />
		</div>
	</div>
</template>

<script setup lang="ts">
import SideNav from '../project/ModelSettings/SideNav.vue';
import settings from './ModelSettings/settings.vue';
</script>

<style scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	/* margin-left: 15px; */
	overflow: hidden;
	align-items: center;
	background-color: #fff;
}
.container {
	width: 1300px;
	height: 100%;
	display: flex;
	flex: 1;
	justify-content: space-evenly;
}
</style>
