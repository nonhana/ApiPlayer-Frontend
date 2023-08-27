<template>
	<div class="main">
		<div class="container">
			<SideNav />
			<settings />
		</div>
	</div>
</template>

<script setup lang="ts">
import SideNav from '../project/ModelSettings/SideNav.vue';
import settings from './ModelSettings/SettingMain.vue';
</script>

<style scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: hidden;
	align-items: center;
	background-color: #fff;
}
.container {
	width: 1300px;
	height: 100%;
	display: flex;
	justify-content: space-between;
}
</style>
