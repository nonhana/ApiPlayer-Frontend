<template>
	<div class="EnvHeader-wrapper">
		<div class="swagger">
			<el-button v-loading.fullscreen.lock="uploadingSwagger" @click="uploadFile">Swagger文档导入(目前仅支持2.0)</el-button>
			<input v-show="false" ref="fileRef" type="file" accept=".yaml, .yml" @change="fileChange" />
		</div>

		<div class="button-group">
			<el-tooltip effect="dark" content="点击查看该接口历史修改记录" placement="top">
				<img style="margin-right: 10px" class="icon" :src="History" alt="History" @click="showDialogList[3] = !showDialogList[3]" />
			</el-tooltip>
			<el-tooltip effect="dark" content="当页面加载过慢时，可以尝试刷新" placement="top">
				<img class="icon" :src="ProjectDetailsEnvHeaderReload" alt="ProjectDetailsEnvHeaderReload" @click="reload" />
			</el-tooltip>
			<el-dropdown @command="envChoosing">
				<el-button v-loading="changingEnv" class="main-button">
					<span>{{ currentEnvName }}</span>
					<img :src="ProjectDetailsEnvHeaderOpenList" alt="ProjectDetailsEnvHeaderOpenList" />
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item v-for="(envItem, index) in envList" :key="index" :command="envItem.env_type">{{ envItem.env_name }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<el-button class="edit-button" @click="showDialogList[0] = !showDialogList[0]">
				<img :src="ProjectDetailsEnvHeaderEdit" alt="ProjectDetailsEnvHeaderEdit" />
			</el-button>
		</div>

		<el-dialog v-model="showDialogList[0]" title="编辑项目全局信息" width="1000px">
			<div class="common-layout">
				<el-container class="edit-dialog" style="height: 500px">
					<el-aside width="200px">
						<el-scrollbar>
							<el-menu default-active="1-1" :default-openeds="['1']" @select="handleSelect">
								<el-sub-menu index="1">
									<template #title>
										<img style="margin-right: 5px" :src="ProjectDetailsEnvHeaderDialogParams" alt="ProjectDetailsEnvHeaderDialogParams" />
										<span>全局变量、参数</span>
									</template>
									<el-menu-item index="1-1">全局变量</el-menu-item>
									<el-menu-item index="1-2">全局参数</el-menu-item>
								</el-sub-menu>
								<el-sub-menu index="2">
									<template #title>
										<img style="margin-right: 5px" :src="ProjectDetailsEnvHeaderDialogEnv" alt="ProjectDetailsEnvHeaderDialogEnv" />
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
							<div v-if="currentEditTable === '1-1'">
								<el-scrollbar>
									<el-table border :data="globalVariables">
										<el-table-column prop="variable_name" label="Nate" width="140" />
										<el-table-column prop="variable_type" label="Type" width="120" />
										<el-table-column show-overflow-tooltip prop="variable_value" label="Value" width="140" />
										<el-table-column prop="variable_desc" label="Description" width="140" />
										<el-table-column label="Actions">
											<template v-if="canModifyGlobalSettings" #default="scope">
												<el-button type="primary" @click="paramAndVarAction(scope.$index, scope.row, 0, 0)">Edit</el-button>
												<el-button type="danger" @click="paramAndVarAction(scope.$index, scope.row, 1, 0)">Delete</el-button>
											</template>
										</el-table-column>
									</el-table>
									<div v-if="canModifyGlobalSettings" style="width: 100%; display: flex; justify-content: center; padding: 20px 0">
										<el-button @click="showDialogList[2] = !showDialogList[2]">Add New Variable</el-button>
									</div>
								</el-scrollbar>
							</div>
							<div v-if="currentEditTable === '1-2'">
								<el-menu default-active="1" mode="horizontal" @select="globalParamsClassSelect">
									<el-menu-item index="1">Header</el-menu-item>
									<el-menu-item index="2">Cookie</el-menu-item>
									<el-menu-item index="3">Query</el-menu-item>
								</el-menu>
								<el-scrollbar>
									<el-table height="300px" border :data="globalParams.find((item) => item.type === Number(currentEditParamsClass) - 1)?.params_list">
										<el-table-column prop="param_name" label="Nate" width="140" />
										<el-table-column prop="param_type" label="Type" width="120" />
										<el-table-column show-overflow-tooltip prop="param_value" label="Value" width="140" />
										<el-table-column prop="param_desc" label="Description" width="140" />
										<el-table-column label="Actions">
											<template v-if="canModifyGlobalSettings" #default="scope">
												<el-button type="primary" @click="paramAndVarAction(scope.$index, scope.row, 0, 1)">Edit</el-button>
												<el-button type="danger" @click="paramAndVarAction(scope.$index, scope.row, 1, 1)">Delete</el-button>
											</template>
										</el-table-column>
									</el-table>
									<div v-if="canModifyGlobalSettings" style="width: 100%; display: flex; justify-content: center; padding: 20px 0">
										<el-button @click="showDialogList[1] = !showDialogList[1]">Add New Parameter</el-button>
									</div>
								</el-scrollbar>
							</div>
							<div v-if="currentEditTable === '2-1'" class="envBox">
								<span>baseUrl：</span>
								<el-input v-model="envList[0].env_baseurl" :disabled="canEditBaseUrl"></el-input>
							</div>
							<div v-if="currentEditTable === '2-2'" class="envBox">
								<span>baseUrl：</span>
								<el-input v-model="envList[1].env_baseurl"></el-input>
							</div>
							<div v-if="currentEditTable === '2-3'" class="envBox">
								<span>baseUrl：</span>
								<el-input v-model="envList[2].env_baseurl"></el-input>
							</div>
							<div v-if="currentEditTable === '2-4'" class="envBox">
								<span>baseUrl：</span>
								<el-input v-model="envList[3].env_baseurl" disabled></el-input>
							</div>
						</el-main>
					</el-container>
				</el-container>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="confirmEdit([0, 0])">关闭</el-button>
					<el-button v-loading="savingEnvInfo" color="#59A8B9" @click="confirmEdit([0, 1])"><span style="color: #fff">保存</span></el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="showDialogList[1]" :title="editingParamsStatus ? '编辑参数信息' : '新增参数信息'" width="600px">
			<div>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>参数名称：</span>
					<el-input v-model="editingParamsInfo.param_name" style="width: 400px" placeholder="请填写参数名称"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>参数类型：</span>
					<el-select v-model="editingParamsInfo.param_type" placeholder="请选择参数类型">
						<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-row>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>参数默认值：</span>
					<el-input v-model="editingParamsInfo.param_value" style="width: 400px" placeholder="请填写参数默认值"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>参数描述：</span>
					<el-input v-model="editingParamsInfo.param_desc" style="width: 400px" placeholder="请填写参数的描述信息"></el-input>
				</el-row>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="confirmEdit([1, 0])">关闭</el-button>
					<el-button color="#59A8B9" @click="confirmEdit([1, 1])"><span style="color: #fff">保存</span></el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="showDialogList[2]" :title="editingVariablesStatus ? '编辑变量信息' : '新增变量信息'" width="600px">
			<div>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>变量名称：</span>
					<el-input v-model="editingVariablesInfo.variable_name" style="width: 400px" placeholder="请填写变量名称"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>变量类型：</span>
					<el-select v-model="editingVariablesInfo.variable_type" placeholder="请选择变量类型">
						<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-row>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>变量默认值：</span>
					<el-input v-model="editingVariablesInfo.variable_value" style="width: 400px" placeholder="请填写变量默认值"></el-input>
				</el-row>
				<el-row type="flex" justify="space-between" style="align-items: center; width: 100%; margin: 0 0 10px">
					<span>变量描述：</span>
					<el-input v-model="editingVariablesInfo.variable_desc" style="width: 400px" placeholder="请填写变量的描述信息"></el-input>
				</el-row>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="confirmEdit([2, 0])">关闭</el-button>
					<el-button color="#59A8B9" @click="confirmEdit([2, 1])"><span style="color: #fff">保存</span></el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="showDialogList[3]" title="项目操作历史记录" width="800px">
			<el-tooltip
				effect="dark"
				content="说明：0-接口基本信息更新；1-接口返回体更新；2-接口请求参数更新；3-接口请求体(Body-JSON)更新；4-新增接口；5-删除接口。"
				placement="right"
			>
				<img style="cursor: pointer; width: 24px; height: 24px; margin: 12px" :src="HistoryTips" alt="HistoryTips" />
			</el-tooltip>
			<!-- 使用el-table以列表形式呈现 -->
			<div style="height: 500px; overflow: auto">
				<el-table :data="history" border>
					<el-table-column prop="createdAt" label="时间" width="160" />
					<el-table-column prop="version_id" label="版本" width="60" />
					<el-table-column prop="version_type" label="类型" width="120" />
					<el-table-column prop="version_msg" label="具体操作" width="280" />
					<el-table-column prop="user_avatar" label="用户信息">
						<template #default="scope">
							<img :src="scope.row.user_avatar" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px" />
							<span>{{ scope.row.user_name }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<template #footer>
				<span>
					<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="versionRollback(history[0].version_id)">
						回滚至上一个版本
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import {
	getProjectGlobalInfo,
	getProjectBasicInfo,
	updateProjectBasicInfo,
	updateProjectGlobalInfo,
	importSwagger,
	getHistoryInfo,
	rollback,
} from '@/api/projects';
import { formatDate } from '@/utils';
import { ProjectRole } from '@/utils/projectPermission';
import type { EnvItem, GlobalParamItem, GlobalVariableItem, ParamItem, HistoryItem } from '@/utils/types';
import ProjectDetailsEnvHeaderReload from '@/static/svg/ProjectDetailsEnvHeaderReload.svg';
import ProjectDetailsEnvHeaderOpenList from '@/static/svg/ProjectDetailsEnvHeaderOpenList.svg';
import ProjectDetailsEnvHeaderEdit from '@/static/svg/ProjectDetailsEnvHeaderEdit.svg';
import ProjectDetailsEnvHeaderDialogParams from '@/static/svg/ProjectDetailsEnvHeaderDialogParams.svg';
import ProjectDetailsEnvHeaderDialogEnv from '@/static/svg/ProjectDetailsEnvHeaderDialogEnv.svg';
import History from '@/static/svg/History.svg';
import HistoryTips from '@/static/svg/HistoryTips.svg';
import { ElMessageBox, ElMessage } from 'element-plus';
import { GlobalParamsListItem, GlobalVariablesListItem } from '@/api/projects/types';

const route = useRoute();
const { baseStore, apiStore } = useStore();

const fileRef = ref<HTMLInputElement>();

const changingEnv = ref<boolean>(false);
const uploadingSwagger = ref<boolean>(false);
const savingEnvInfo = ref<boolean>(false);
const fullscreenLoading = ref<boolean>(false);

const canModifyGlobalSettings = computed(() => {
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] !== ProjectRole.READ_ONLY;
});
const canEditBaseUrl = computed(() => {
	return baseStore.projectRoleList[baseStore.curProjectInfo.project_id!] === ProjectRole.READ_ONLY;
});

const typeList = [
	{
		value: 'number',
		label: 'number',
	},
	{
		value: 'integer',
		label: 'integer',
	},
	{
		value: 'string',
		label: 'string',
	},
];

const envList = ref<EnvItem[]>([]); // 环境列表
const globalParams = ref<GlobalParamItem[]>([]); // 全局参数列表
const globalVariables = ref<GlobalVariableItem[]>([]); // 全局变量列表
const projectCurrentType = ref<number>(0); // 当前环境类型 0-开发环境 1-测试环境 2-正式环境 3-mock.js环境
const currentEnvName = ref<string>(''); // 当前项目所处的环境名称
const showDialogList = ref<boolean[]>([false, false, false, false]); // 控制弹窗显示隐藏
const currentEditName = ref<string>('全局变量'); // 当前正在编辑的是什么内容，默认是全局变量
const currentEditTable = ref<string>('1-1'); // 当前正在编辑的主要窗口
const currentEditParamsClass = ref<string>('1'); // 当前正在编辑的全局参数所属的类别。0-Header，1-Query，2-Cookie
// 点开编辑全局参数弹窗时，当前正在编辑的全局参数信息
const editingParamsInfo = ref<ParamItem>({
	param_name: '',
	param_type: '',
	param_value: '',
	param_desc: '',
});
// 点开编辑全局变量弹窗时，当前正在编辑的全局变量信息
const editingVariablesInfo = ref<GlobalVariableItem>({
	variable_name: '',
	variable_type: '',
	variable_value: '',
	variable_desc: '',
});
const editingParamsStatus = ref<boolean>(false); // false：正在新增参数，true：正在编辑参数
const editingVariablesStatus = ref<boolean>(false); // false：正在新增变量，true：正在编辑变量
let sourceFile: File | null | undefined = null;

const history = ref<HistoryItem[]>([]);

// 下拉框点击切换环境
const envChoosing = async (envType: number) => {
	changingEnv.value = true;
	projectCurrentType.value = envType;
	apiStore.setPreUrl(envList.value.find((item) => item.env_type === projectCurrentType.value)!.env_baseurl);
	currentEnvName.value = envList.value.find((item) => item.env_type === envType)!.env_name;
	await updateProjectBasicInfo({
		project_id: Number(route.params.project_id),
		project_current_type: envType,
	});
	// 切换环境后，更新apiStore中的apiInfo
	if (route.query.api_id) {
		await apiStore.getApiInfo(Number(route.query.api_id));
	}
	changingEnv.value = false;
};
// 是否确认变更
const confirmEdit = async (type: number[]) => {
	if (type[0] === 0) {
		if (type[1] === 0) {
			showDialogList.value[0] = false;
		} else {
			savingEnvInfo.value = true;
			// 将envList保存到数据库
			const envListSource = envList.value.map((item) => {
				let envType: number = 0;
				switch (item.env_name) {
					case '开发环境':
						envType = 0;
						break;
					case '测试环境':
						envType = 1;
						break;
					case '正式环境':
						envType = 2;
						break;
					case 'mock.js环境':
						envType = 3;
						break;
					default:
						break;
				}
				return {
					env_type: envType,
					env_baseurl: item.env_baseurl,
				};
			});

			await updateProjectGlobalInfo({
				project_id: Number(route.params.project_id),
				env_list: envListSource,
			});
			if (route.query.api_id) {
				// 重新获取apiStore
				await apiStore.getApiInfo(Number(route.query.api_id));
			}
			savingEnvInfo.value = false;
			showDialogList.value[0] = false;
			ElMessage.success('保存成功');
		}
	} else if (type[0] === 1) {
		if (type[1] === 0) {
			showDialogList.value[1] = false;
		} else {
			// 分两种：1.新增 2.修改
			if (editingParamsStatus.value) {
				// 将editingParamsInfo中的值根据param_id，更新到globalParams中
				const index = globalParams.value.findIndex((item) => item.type === Number(currentEditParamsClass.value) - 1);
				const paramsIndex = globalParams.value[index].params_list.findIndex((item) => item.param_id === editingParamsInfo.value.param_id);
				globalParams.value[index].params_list[paramsIndex] = editingParamsInfo.value;
			} else {
				// 新增
				const index = globalParams.value.findIndex((item) => item.type === Number(currentEditParamsClass.value) - 1);
				globalParams.value[index].params_list.push(editingParamsInfo.value);
			}

			// 把新的globalParams通过接口更新到数据库。但是需要先转换格式
			const paramsList = globalParams.value.map((item) => {
				return {
					type: item.type,
					params_list: item.params_list.map((item) => {
						let paramType: number = 0;
						switch (item.param_type) {
							case 'number':
								paramType = 0;
								break;
							case 'integer':
								paramType = 1;
								break;
							case 'string':
								paramType = 2;
								break;
							default:
								break;
						}

						const paramObject: {
							param_name: string;
							param_type: number;
							param_value: string;
							param_desc: string;
							param_action_type: number;
							[key: string]: any;
						} = {
							param_name: item.param_name,
							param_type: paramType,
							param_value: JSON.stringify({
								value: item.param_value,
							}),
							param_desc: item.param_desc,
							param_action_type: 1,
						};

						// 如果 item 中有 param_id，说明是修改，否则是新增
						if (item.param_id) {
							paramObject.param_id = item.param_id;
							paramObject.param_action_type = 0;
						}

						return paramObject;
					}),
				};
			});

			await updateProjectGlobalInfo({
				project_id: Number(route.params.project_id),
				global_params: paramsList,
			});
			if (route.query.api_id) {
				// 重新获取apiStore
				await apiStore.getApiInfo(Number(route.query.api_id));
			}

			// 更新完成后，将editingParamsInfo置空
			editingParamsInfo.value = {
				param_name: '',
				param_type: '',
				param_value: '',
				param_desc: '',
			};

			showDialogList.value[1] = false;
			ElMessage.success(editingParamsStatus.value ? '修改成功' : '添加成功');
		}
	} else {
		if (type[1] === 0) {
			showDialogList.value[2] = false;
		} else {
			// 分两种：1.新增 2.修改
			if (editingVariablesStatus.value) {
				// 将editingVariablesInfo中的值根据variable_id，更新到globalVariables中
				const index = globalVariables.value.findIndex((item) => item.variable_id === editingVariablesInfo.value.variable_id);
				globalVariables.value[index] = editingVariablesInfo.value;
			} else {
				// 新增
				globalVariables.value.push(editingVariablesInfo.value);
			}

			// 把新的globalVariables通过接口更新到数据库。但是需要先转换格式
			const variablesList = globalVariables.value.map((item) => {
				let variableType: number = 0;
				switch (item.variable_type) {
					case 'number':
						variableType = 0;
						break;
					case 'integer':
						variableType = 1;
						break;
					case 'string':
						variableType = 2;
						break;
					default:
						break;
				}

				const variableObject: {
					variable_name: string;
					variable_type: number;
					variable_value: string;
					variable_desc: string;
					variable_action_type: number;
					[key: string]: any;
				} = {
					variable_name: item.variable_name,
					variable_type: variableType,
					variable_value: JSON.stringify({
						value: item.variable_value,
					}),
					variable_desc: item.variable_desc,
					variable_action_type: 1, // 默认是新增
				};

				// 如果 item 中有 variable_id，说明是修改，否则是新增
				if (item.variable_id) {
					variableObject.variable_id = item.variable_id;
					variableObject.variable_action_type = 0;
				}

				return variableObject;
			});

			await updateProjectGlobalInfo({
				project_id: Number(route.params.project_id),
				global_variables: variablesList,
			});
			if (route.query.api_id) {
				// 重新获取apiStore
				await apiStore.getApiInfo(Number(route.query.api_id));
			}

			// 更新完成后，将editingVariablesInfo置空
			editingVariablesInfo.value = {
				variable_name: '',
				variable_type: '',
				variable_value: '',
				variable_desc: '',
			};

			showDialogList.value[2] = false;
			ElMessage.success(editingVariablesStatus.value ? '修改成功' : '添加成功');
		}
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
// 选择全局参数的类型：1-Header，2-Cookie，3-Query
const globalParamsClassSelect = (index: string) => {
	currentEditParamsClass.value = index;
};
// 点击回滚按钮进行版本回滚
const versionRollback = (versionId: number) => {
	ElMessageBox.confirm('是否确认回滚？')
		.then(async () => {
			fullscreenLoading.value = true;
			const res = await rollback({
				version_id: versionId,
				project_id: Number(route.params.project_id),
			});
			fullscreenLoading.value = false;
			if (res.result_code === 0) {
				ElMessage.success('回滚成功');
				reload();
			} else {
				ElMessage.error('回滚失败');
			}
		})
		.catch(() => {});
};
// 点击全局参数、全局变量table中的按钮
const paramAndVarAction = (index: number, row: any, actionType: number, actionObjType: number) => {
	if (actionObjType === 1) {
		switch (actionType) {
			case 0:
				editingParamsStatus.value = true;
				showDialogList.value[1] = true;
				editingParamsInfo.value = {
					param_id: row.param_id,
					param_name: row.param_name,
					param_type: row.param_type,
					param_value: row.param_value,
					param_desc: row.param_desc,
				};
				break;
			case 1:
				ElMessageBox.confirm('是否确认删除？')
					.then(async () => {
						const paramsList = globalParams.value.map((item) => {
							return {
								type: item.type,
								params_list: <GlobalParamsListItem[]>[],
							};
						});

						// 找到要删除的那一项，把param_action_type置为2，加到paramsList中
						paramsList[Number(currentEditParamsClass.value) - 1].params_list.push({
							param_id: row.param_id,
							param_action_type: 2,
						});

						await updateProjectGlobalInfo({
							project_id: Number(route.params.project_id),
							global_params: paramsList,
						});
						if (route.query.api_id) {
							// 重新获取apiStore
							await apiStore.getApiInfo(Number(route.query.api_id));
						}

						globalParams.value[Number(currentEditParamsClass.value) - 1].params_list.splice(index, 1);
						ElMessage.success('已删除');
					})
					.catch(() => {});
				break;
			default:
				break;
		}
	} else {
		switch (actionType) {
			case 0:
				editingVariablesStatus.value = true;
				showDialogList.value[2] = true;
				editingVariablesInfo.value = {
					variable_id: row.variable_id,
					variable_name: row.variable_name,
					variable_type: row.variable_type,
					variable_value: row.variable_value,
					variable_desc: row.variable_desc,
				};
				break;
			case 1:
				ElMessageBox.confirm('是否确认删除？')
					.then(async () => {
						const variablesList: GlobalVariablesListItem[] = [];

						// 找到要删除的那一项，把variable_action_type置为2，加到variablesList中
						variablesList.push({
							variable_id: row.variable_id,
							variable_action_type: 2,
						});

						await updateProjectGlobalInfo({
							project_id: Number(route.params.project_id),
							global_variables: variablesList,
						});
						if (route.query.api_id) {
							// 重新获取apiStore
							await apiStore.getApiInfo(Number(route.query.api_id));
						}

						globalVariables.value.splice(index, 1);
						ElMessage.success('已删除');
					})
					.catch(() => {});
				break;
			default:
				break;
		}
	}
};
// 点击按钮，刷新页面
const reload = () => {
	window.location.reload();
};
// 点击上传按钮，触发input[type=file]的点击事件
const uploadFile = () => {
	fileRef.value?.click();
};
// 上传Swagger文档
const fileChange = async () => {
	uploadingSwagger.value = true;
	sourceFile = fileRef.value?.files?.[0] || null;
	if (sourceFile !== null) {
		// 将sourceFile转成Blob
		const blob = new Blob([sourceFile], { type: 'application/x-yaml' });
		// 把blob转换成file
		const file = new File([blob], 'swagger.yaml', { type: 'application/x-yaml' });
		const res = await importSwagger({
			project_id: Number(route.params.project_id),
			yamlFile: file,
		});
		if (res.result_code === 0) {
			ElMessage.success('上传成功');
			uploadingSwagger.value = false;
			reload();
		} else {
			ElMessage.error('上传失败');
			uploadingSwagger.value = false;
		}
	} else {
		ElMessage.error('上传失败');
	}
};

watch(
	() => showDialogList.value[1],
	(newV, _) => {
		if (!newV) {
			editingParamsStatus.value = false;
			editingParamsInfo.value = {
				param_name: '',
				param_type: '',
				param_value: '',
				param_desc: '',
			};
		}
	}
);
watch(
	() => showDialogList.value[2],
	(newV, _) => {
		if (!newV) {
			editingVariablesStatus.value = false;
			editingVariablesInfo.value = {
				variable_name: '',
				variable_type: '',
				variable_value: '',
				variable_desc: '',
			};
		}
	}
);

onMounted(async () => {
	// 拿到项目的全局信息
	const globalInfo = await getProjectGlobalInfo({
		project_id: Number(route.params.project_id),
	});

	// 获取该项目当前所处的环境
	projectCurrentType.value = (
		await getProjectBasicInfo({
			project_id: Number(route.params.project_id),
		})
	).result.project_current_type;

	// 获取项目操作历史记录
	history.value = (await getHistoryInfo({ project_id: Number(route.params.project_id) })).result.map((item) => {
		return {
			createdAt: formatDate(item.createdAt),
			project_id: item.project_id,
			version_id: item.version_id,
			version_type: item.version_type,
			// 把所有的；替换成换行
			version_msg: item.version_msg.replace(/；/g, '\n'),
			user_id: item.user_id,
			user_name: item.user_name,
			user_avatar: item.user_avatar,
		};
	});

	// 处理全局信息，将其转换为前端需要的格式
	// 1. env_list
	envList.value = globalInfo.result.env_list.map((item) => {
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
	apiStore.setPreUrl(envList.value.find((item) => item.env_type === projectCurrentType.value)!.env_baseurl);
	// 2. global_params
	globalParams.value = globalInfo.result.global_params.map((item) => {
		return {
			type: item.type,
			params_list: item.params_list.map((param) => {
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
						paramType = 'unknown';
						break;
				}
				return {
					param_id: param.param_id!,
					param_name: param.param_name!,
					param_type: paramType,
					param_value: typeof param.param_value === 'string' ? JSON.parse(param.param_value) : param.param_value,
					param_desc: param.param_desc!,
				};
			}),
		};
	});
	for (let i = 0; i < 3; i++) {
		if (!globalParams.value[i]) {
			globalParams.value[i] = {
				type: i,
				params_list: [],
			};
		}
	}
	// 3. global_variables
	globalVariables.value = globalInfo.result.global_variables.map((item) => {
		let variableType = '';
		switch (item.variable_type) {
			case 0:
				variableType = 'number';
				break;
			case 1:
				variableType = 'integer';
				break;
			case 2:
				variableType = 'string';
				break;
			default:
				variableType = '未知类型';
				break;
		}
		return {
			variable_id: item.variable_id!,
			variable_name: item.variable_name!,
			variable_type: variableType,
			variable_value: typeof item.variable_value === 'string' ? JSON.parse(item.variable_value) : item.variable_value,
			variable_desc: item.variable_desc!,
		};
	});
	// 把当前环境的名称显示在页面上
	currentEnvName.value = envList.value.find((item) => item.env_type === projectCurrentType.value)!.env_name;
});
</script>

<style scoped lang="less">
.EnvHeader-wrapper {
	position: relative;
	width: 1050px;
	padding: 0 20px;
	height: 50px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-left: 1px solid #bdbdbd;
	border-bottom: 1px solid #bdbdbd;
	border-right: 1px solid #bdbdbd;
	.button-group {
		display: flex;
		align-items: center;
		.icon {
			margin-right: 10px;
			width: 20px;
			height: 20px;
			cursor: pointer;
		}
		.main-button {
			font-family: Microsoft YaHei;
			font-size: 14px;
			font-weight: normal;
			color: #3d3d3d;
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

	.envBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 20px;
		span {
			font-family: Microsoft YaHei;
			font-size: 18px;
			font-weight: normal;
			color: #3d3d3d;
		}
	}
}

:deep(.el-input) {
	height: 40px;
}
:deep(.cell) {
	display: flex;
	align-items: center;
	white-space: pre-wrap; // 遇到/n换行
}
</style>
