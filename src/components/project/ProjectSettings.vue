<template>
	<div class="main">
		<!-- <CommonHeader></CommonHeader> -->
		<div class="container">
			<SideNav></SideNav>
			<Settings></Settings>
		</div>
	</div>
</template>

<script setup lang="ts">
import SideNav from '../project/ModelSettings/SideNav.vue';
import Settings from './ModelSettings/Settings.vue';
import CommonHeader from '@/components/CommonHeader.vue';
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
