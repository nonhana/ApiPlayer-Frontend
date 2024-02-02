<template>
	<div class="ProjectSettings-wrapper">
		<div class="container">
			<SideNav />
			<SettingMain />
		</div>
	</div>
</template>

<script setup lang="ts">
import SideNav from '../project/ModelSettings/SideNav.vue';
import SettingMain from './ModelSettings/SettingMain.vue';
</script>

<style scoped lang="less">
.ProjectSettings-wrapper {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: hidden;
	align-items: center;
	background-color: #fff;
	.container {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
}
</style>
