<template>
	<div class="index">
		<el-row class="title">
			<el-text class="mx-1" size="large">{{ apiOperation.apiInfo.api_name }}</el-text>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-tag type="" class="mx-1" effect="dark" round size="large">
					{{ apiOperation.apiInfo.api_method }}
				</el-tag>
				<el-text class="mx-1" size="large" style="padding-left: 2%">{{ apiOperation.apiInfo.api_url }}</el-text>
				<el-text class="mx-1" size="large" style="padding-left: 5%">{{ statusMap.get(apiOperation.apiInfo.api_status) }}</el-text>
			</el-col>
		</el-row>
		<el-row>
			<el-text class="mx-1">前置url：{{ apiOperation.apiInfo.baseUrl }} </el-text>
		</el-row>
		<el-row>
			<el-text class="mx-1">创建时间 {{ timestampToTime(Date.parse(apiOperation.apiInfo.api_createdAt)) }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">修改时间 {{ timestampToTime(Date.parse(apiOperation.apiInfo.api_editedAt)) }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">修改者 {{ apiEditorName }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">创建者 {{ apiCreatorName }}</el-text>
			<el-col :span="1"></el-col>
			<el-text class="mx-1">责任人 {{ apiPrincipalName }}</el-text>
			<el-col :span="1"></el-col>
		</el-row>
		<el-divider></el-divider>
		<el-row>
			<el-text class="mx-1" size="large">接口说明</el-text>
		</el-row>
		<el-row>
			<el-text class="mx-1"> {{ apiOperation.apiInfo.api_desc }}</el-text>
		</el-row>
		<el-divider></el-divider>
		<el-row>
			<el-text class="mx-1" size="large">请求参数</el-text>
		</el-row>
		<div v-if="apiOperation.apiInfo.api_request_params.length > 0">
			<div v-for="(item, index) in apiOperation.apiInfo.api_request_params" :key="index">
				<el-text class="mx-1" size="large">{{ map.get(item.type) }}</el-text>
				<el-row>
					<el-table :data="item.params_list" border style="width: 100%">
						<el-table-column prop="param_name" label="name" />
						<el-table-column prop="param_type" label="type" />
						<el-table-column prop="param_desc" label="desc" />
					</el-table>
				</el-row>
				<el-divider></el-divider>
			</div>
		</div>
		<div v-else class="params-empty">
			<span>暂无请求参数，先添加一些请求参数吧！</span>
		</div>

		<el-divider></el-divider>
		<el-row>
			<el-text class="mx-1" size="large">返回响应</el-text>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName" type="card" class="doc-tabs">
				<div v-for="(item, index) in apiOperation.apiInfo.api_responses" :key="index">
					<el-tab-pane :label="item.response_name" :name="index">
						<ResponseCard :context="item" />
					</el-tab-pane>
				</div>
			</el-tabs>
		</el-row>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import ResponseCard from '../components/ResponseCard.vue';
import { apiStore } from '@/store/apis.ts';
import { useRoute } from 'vue-router';
import { getUserInfo } from '@/api/users';

const route = useRoute();
const map = new Map().set(0, 'Params').set(1, 'Body(form-data)').set(2, 'Body(x-www-form-unlencoded)').set(3, 'Cookie').set(4, 'Header');
const statusMap = new Map().set(0, '开发中').set(1, '测试中').set(2, '已发布').set(3, '将废弃');

const apiOperation = apiStore();
const activeName = ref<number>(0);
const apiPrincipalName = ref<string>('');
const apiCreatorName = ref<string>('');
const apiEditorName = ref<string>('');

const getInfo = async (thisId: number) => {
	await apiOperation.getApiInfo(thisId);
};

const timestampToTime = (timestamp: number | null) => {
	// 由于时差问题要加8小时 == 28800000毫秒
	let date = timestamp ? new Date(timestamp + 28800000) : new Date();
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
};

watch(
	() => route.query.api_id,
	async (newV, _) => {
		if (newV) {
			await getInfo(Number(newV));
		}
	},
	{ immediate: true, deep: true }
);

onMounted(async () => {
	apiPrincipalName.value = (
		await getUserInfo({
			user_id: apiOperation.apiInfo.api_principal_id,
		})
	).data.result.userInfo.username;
	apiCreatorName.value = (
		await getUserInfo({
			user_id: apiOperation.apiInfo.api_creator_id,
		})
	).data.result.userInfo.username;
	apiEditorName.value = (
		await getUserInfo({
			user_id: apiOperation.apiInfo.api_editor_id,
		})
	).data.result.userInfo.username;
});
</script>

<style lang="less">
.index {
	width: 1000px;
	background-color: #fff;

	.title {
		width: 1000px;
	}

	.showparent {
		display: flex;
		align-items: center;
	}

	.params-empty {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f7fa;
		border-radius: 20px;
		span {
			color: #909399;
		}
	}

	.el-row {
		margin-bottom: 20px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.deoc-tabs > .el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}
}
</style>
