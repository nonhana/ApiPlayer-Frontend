<template>
	<div class="index">
		<CommonHeader />
		<div class="index-main">
			<MainWindow />
		</div>
	</div>
</template>

<script setup lang="ts">
import MainWindow from '@/components/personalCenter/MainWindow.vue';
import CommonHeader from '@/components/CommonHeader.vue';
</script>

<style scoped lang="less">
.index {
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	&-main {
		display: flex;
		justify-content: center;
	}
}
</style>
