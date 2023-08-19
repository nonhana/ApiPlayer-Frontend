<template>
	<div class="EnvHeader-wrap">
		<div class="button-group">
			<img class="reload" src="../../../../static/svg/ProjectDetailsEnvHeaderReload.svg" />

			<el-dropdown @command="envChoosing">
				<el-button-group>
					<el-button class="main-button" color="#fff" type="primary">
						<span>{{ currentEnvName }}</span>
						<img src="../../../../static/svg/ProjectDetailsEnvHeaderOpenList.svg" />
					</el-button>
					<el-button class="edit-button" color="#fff" type="primary" @click="showDialog = !showDialog">
						<img src="../../../../static/svg/ProjectDetailsEnvHeaderEdit.svg" />
					</el-button>
				</el-button-group>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item v-for="(envItem, index) in envList" :key="index" :command="envItem.env_type">{{ envItem.env_name }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>

		<el-dialog v-model="showDialog" title="编辑项目全局信息" width="1000px" :before-close="handleClose">
			<div class="common-layout">
				<el-container class="edit-dialog" style="height: 500px">
					<el-aside width="200px">
						<el-scrollbar>
							<el-menu default-active="1-1" :default-openeds="['1']" @select="handleSelect">
								<el-sub-menu index="1">
									<template #title>
										<img style="margin-right: 5px" src="../../../../static/svg/ProjectDetailsEnvHeaderDialogParams.svg" />
										<span>全局变量、参数</span>
									</template>
									<el-menu-item index="1-1">全局变量</el-menu-item>
									<el-menu-item index="1-2">全局参数</el-menu-item>
								</el-sub-menu>
								<el-sub-menu index="2">
									<template #title>
										<img style="margin-right: 5px" src="../../../../static/svg/ProjectDetailsEnvHeaderDialogEnv.svg" />
										<span>环境管理</span>
									</template>
									<el-menu-item v-for="(envItem, index) in envList" :key="index" :index="`2-${envItem.env_type + 1}`">{{
										envItem.env_name
									}}</el-menu-item>
								</el-sub-menu>
							</el-menu>
						</el-scrollbar>
					</el-aside>

					<el-container>
						<el-header style="text-align: left; font-size: 16px">
							<div class="toolbar">
								<span>{{ currentEditName }}</span>
							</div>
						</el-header>

						<el-main>
							<el-scrollbar>
								<div v-if="currentEditTable === '1-1'">
									<el-table border :data="globalVariables">
										<el-table-column prop="variable_name" label="Nate" width="140" />
										<el-table-column prop="variable_type" label="Type" width="120" />
										<el-table-column prop="variable_value" label="Value" width="140" />
										<el-table-column prop="variable_desc" label="Describe" />
									</el-table>
								</div>
								<div v-if="currentEditTable === '1-2'">
									<el-menu default-active="1" mode="horizontal" @select="globalParamsClassSelect">
										<el-menu-item index="1">Header</el-menu-item>
										<el-menu-item index="2">Cookie</el-menu-item>
										<el-menu-item index="3">Query</el-menu-item>
									</el-menu>

									<el-table border :data="globalParams.find((item) => item.type === Number(currentEditParamsClass) - 1)?.params_list">
										<el-table-column prop="param_name" label="Nate" width="140" />
										<el-table-column prop="param_type" label="Type" width="120" />
										<el-table-column prop="param_value" label="Value" width="140" />
										<el-table-column prop="param_desc" label="Describe" width="140" />
										<el-table-column label="Actions">
											<el-button type="primary">Edit</el-button>
											<el-button type="danger">Delete</el-button>
										</el-table-column>
									</el-table>
								</div>
								<div v-if="currentEditTable === '2-1'">
									<span>baseUrl：</span>
									<el-input v-model="envBaseUrlList[0]"></el-input>
								</div>
								<div v-if="currentEditTable === '2-2'">
									<span>baseUrl：</span>
									<el-input v-model="envBaseUrlList[1]"></el-input>
								</div>
								<div v-if="currentEditTable === '2-3'">
									<span>baseUrl：</span>
									<el-input v-model="envBaseUrlList[2]"></el-input>
								</div>
								<div v-if="currentEditTable === '2-4'">
									<span>baseUrl：</span>
									<el-input v-model="envBaseUrlList[3]"></el-input>
								</div>
							</el-scrollbar>
						</el-main>
					</el-container>
				</el-container>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="confirmEdit(0)">取消</el-button>
					<el-button color="#59A8B9" @click="confirmEdit(1)"><span style="color: #fff">确认</span></el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProjectGlobalInfo, getProjectBasicInfo, updateProjectBasicInfo } from '@/api/projects';
import { ElMessageBox, ElMessage } from 'element-plus';

interface EnvItem {
	env_type: number;
	env_name: string;
	env_baseurl: string;
}
interface ParamItem {
	param_id: number;
	param_name: string;
	param_type: number;
	param_value: string;
	param_desc: string;
}
interface GlobalParamItem {
	type: number;
	params_list: ParamItem[];
}
interface GlobalVariableItem {
	variable_name: string;
	variable_type: number;
	variable_value: string;
	variable_desc: string;
}

const route = useRoute();

let envList = ref<EnvItem[]>([]);
let globalParams = ref<GlobalParamItem[]>([]);
let globalVariables = ref<GlobalVariableItem[]>([]);
let projectCurrentType = ref<number>(0);
let currentEnvName = ref<string>('');
let showDialog = ref<boolean>(false);
let currentEditName = ref<string>('全局变量');
let currentEditTable = ref<string>('1-1');
let currentEditParamsClass = ref<string>('1');
let envBaseUrlList = ref<string[]>([]);

// 下拉框点击切换环境
const envChoosing = async (envType: number) => {
	projectCurrentType.value = envType;
	currentEnvName.value = envList.value.find((item) => item.env_type === envType)!.env_name;
	await updateProjectBasicInfo({
		project_id: Number(route.params.project_id),
		project_current_type: envType,
	});
};
// 直接点击el-dialog的叉叉关闭
const handleClose = (done: () => void) => {
	ElMessageBox.confirm('你的设置尚未保存，确定放弃修改吗？').then(() => {
		done();
	});
};
// 是否确认变更
const confirmEdit = (type: number) => {
	if (type === 0) {
		showDialog.value = false;
		ElMessage.info('已取消');
	} else {
		showDialog.value = false;
		ElMessage.success('已确认');
	}
};
// 选择某个菜单项
const handleSelect = (index: string) => {
	currentEditTable.value = index;
	switch (index) {
		case '1-1':
			currentEditName.value = '全局变量';
			break;
		case '1-2':
			currentEditName.value = '全局参数';
			break;
		case '2-1':
			currentEditName.value = '开发环境';
			break;
		case '2-2':
			currentEditName.value = '测试环境';
			break;
		case '2-3':
			currentEditName.value = '正式环境';
			break;
		case '2-4':
			currentEditName.value = 'mock.js环境';
			break;
	}
};
// 选择全局参数的类型
const globalParamsClassSelect = (index: string) => {
	currentEditParamsClass.value = index;
};

onMounted(async () => {
	const globalInfo = (
		await getProjectGlobalInfo({
			project_id: Number(route.params.project_id),
		})
	).data;

	projectCurrentType.value = (
		await getProjectBasicInfo({
			project_id: Number(route.params.project_id),
		})
	).data.project_info.project_current_type;

	envList.value = globalInfo.env_list.map((item: any) => {
		let envName = '';
		switch (item.env_type) {
			case 0:
				envName = '开发环境';
				break;
			case 1:
				envName = '测试环境';
				break;
			case 2:
				envName = '正式环境';
				break;
			case 3:
				envName = 'mock.js环境';
				break;
			default:
				envName = '未知环境';
				break;
		}
		return {
			env_type: item.env_type,
			env_name: envName,
			env_baseurl: item.env_baseurl,
		};
	});
	envBaseUrlList.value = envList.value.map((item) => item.env_baseurl);
	globalParams.value = globalInfo.global_params.map((item: any) => {
		return {
			type: item.type,
			params_list: item.params_list.map((param: any) => {
				let paramType = '';
				switch (param.param_type) {
					case 0:
						paramType = 'number';
						break;
					case 1:
						paramType = 'integer';
						break;
					case 2:
						paramType = 'string';
						break;
					default:
						paramType = '未知类型';
						break;
				}
				return {
					param_id: param.param_id,
					param_name: param.param_name,
					param_type: paramType,
					param_value: JSON.parse(param.param_value).value,
					param_desc: param.param_desc,
				};
			}),
		};
	});
	globalVariables.value = globalInfo.global_variable;

	currentEnvName.value = envList.value.find((item) => item.env_type === projectCurrentType.value)!.env_name;
});
</script>

<style scoped lang="less">
.EnvHeader-wrap {
	position: relative;
	width: 1000px;
	height: 50px;
	background-color: #f5f5f5;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border: 1px solid #3d3d3d;
	.button-group {
		display: flex;
		align-items: center;
		.reload {
			margin-right: 10px;
			width: 20px;
			height: 20px;
			cursor: pointer;
		}
		.main-button {
			span {
				font-family: Microsoft YaHei;
				font-size: 16px;
				font-weight: normal;
				color: #3d3d3d;
			}
			img {
				margin-left: 10px;
				width: 16px;
				height: 16px;
			}
		}
		.edit-button {
			img {
				width: 32px;
				height: 32px;
			}
		}
	}
}

/* dialog样式 */
:deep(.el-dialog) {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
	border-radius: 20px;
}
:deep(.el-dialog__header) {
	display: flex;
	justify-content: center;
}

/* el-container样式 */
.edit-dialog {
	.el-header {
		position: relative;
		background-color: #f5f5f5;
		color: #3d3d3d;
	}
	.el-aside {
		color: #3d3d3d;
		background: #f5f5f5;
	}
	.el-menu {
		border-right: none;
	}
	.el-main {
		padding: 0;
	}
	.toolbar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		right: 20px;
	}
}
</style>
