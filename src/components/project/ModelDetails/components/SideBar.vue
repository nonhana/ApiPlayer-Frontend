<template>
	<div class="SideBar-wrap">
		<el-scrollbar>
			<el-tree
				:data="dataSource"
				draggable
				default-expand-all
				node-key="id"
				:expand-on-click-node="false"
				:render-content="renderContent"
				@node-click="checkoutApi"
				@node-drag-start="handleDragStart"
				@node-drop="handleDrop"
			/>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProjectApiList, addDictionary, updateDictionary, deleteDictionary } from '@/api/projects';
import { addApi, updateApi, deleteApi } from '@/api/apis';
import type { ApiAddInfo } from '@/api/apis';
import { ElMessageBox, ElMessage } from 'element-plus';
import { apiStore } from '@/store/apis.ts';
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { NodeDropType } from 'element-plus/es/components/tree/src/tree.type';

interface Tree {
	id: number;
	label: string;
	type: string;
	children: Tree[];
}

const route = useRoute();
const router = useRouter();
const apiOperation = apiStore();

let newChild = ref<Tree>({ id: 0, label: '', type: '', children: [] });
let dataSource = ref<Tree[]>([]);
let copyDataSource = ref<Tree[]>([]);
let windowShowList = ref<boolean[]>([false]);
let showInputBox = ref<boolean[]>([]);

// 节点拖曳相关函数
const handleDragStart = () => {
	// 开始拖曳时，克隆一份数据
	copyDataSource.value = JSON.parse(JSON.stringify(dataSource.value));
};
const handleDrop = (draggingNode: Node, dropNode: Node, dropType: NodeDropType) => {
	// 拖拽到目录下
	if (dropType === 'inner') {
		if (dropNode.data.type === 'dictionary') {
			if (draggingNode.data.type === 'dictionary') {
				ElMessageBox.confirm('确定要移动该目录吗？')
					.then(async (action: string) => {
						if (action === 'confirm') {
							// 调用接口，更新目录的father_id
							const res = await updateDictionary({
								father_id: dropNode.data.id,
								dictionary_id: draggingNode.data.id,
							});
							if (res.data.result_code === 0) {
								ElMessage.success('移动成功');
							}
						}
					})
					.catch(() => {
						// 如果点击取消，将拖拽的节点移回原来的位置
						draggingNode.remove();
						dataSource.value = copyDataSource.value;
						ElMessage.info('取消移动');
					});
			} else {
				ElMessageBox.confirm('确定要移动该接口吗？')
					.then(async (action: string) => {
						if (action === 'confirm') {
							// 调用接口，更新接口的dictionary_id
							const res = await updateApi({
								api_id: draggingNode.data.id,
								dictionary_id: dropNode.data.id,
							});
							if (res.data.result_code === 0) {
								ElMessage.success('移动成功');
							}
						}
					})
					.catch(() => {
						// 如果点击取消，将拖拽的节点移回原来的位置
						draggingNode.remove();
						dataSource.value = copyDataSource.value;
					});
			}
		} else {
			ElMessage.error('请拖放到目录下~!');
			dataSource.value = copyDataSource.value;
		}
	} else if (dropType === 'before' || dropType === 'after') {
		if (draggingNode.data.type === 'dictionary') {
			ElMessageBox.confirm('确定要移动该目录吗？')
				.then(async (action: string) => {
					if (action === 'confirm') {
						const res = await updateDictionary({
							father_id: findParentId(dataSource.value[0], dropNode.data.id),
							dictionary_id: draggingNode.data.id,
						});
						if (res.data.result_code === 0) {
							ElMessage.success('移动成功');
						}
					}
				})
				.catch(() => {
					// 如果点击取消，将拖拽的节点移回原来的位置
					draggingNode.remove();
					dataSource.value = copyDataSource.value;
				});
		} else {
			ElMessageBox.confirm('确定要移动该接口吗？')
				.then(async (action: string) => {
					if (action === 'confirm') {
						// 调用接口，更新接口的dictionary_id
						const res = await updateApi({
							api_id: draggingNode.data.id,
							dictionary_id: findParentId(dataSource.value[0], dropNode.data.id),
						});
						if (res.data.result_code === 0) {
							ElMessage.success('移动成功');
						}
					}
				})
				.catch(() => {
					// 如果点击取消，将拖拽的节点移回原来的位置
					draggingNode.remove();
					dataSource.value = copyDataSource.value;
				});
		}
	}
};
// 新增目录、接口
const append = async (data: Tree, type: number) => {
	if (type === 0) {
		newChild.value = { id: 0, label: '新建目录', type: 'dictionary', children: [] };
		windowShowList.value[0] = true;
		if (!data.children) {
			data.children = [];
		}
		const new_dict_id = (
			await addDictionary({
				project_id: Number(route.params.project_id),
				father_id: data.id,
				dictionary_name: newChild.value.label,
			})
		).data.dictionary_id;
		newChild.value.id = new_dict_id;

		data.children.push(newChild.value);
		dataSource.value = [...dataSource.value];
		showInputBox.value = [...showInputBox.value, false];
	} else {
		newChild.value = { id: 0, label: '新建接口', type: 'GET', children: [] };
		windowShowList.value[1] = true;
		if (!data.children) {
			data.children = [];
		}
		const newApiInfo: ApiAddInfo = {
			dictionary_id: data.id,
			project_id: Number(route.params.project_id),
			api_editor_id: JSON.parse(localStorage.getItem('userInfo')!).user_id,
			api_creator_id: JSON.parse(localStorage.getItem('userInfo')!).user_id,
		};
		const new_api_id = (await addApi(newApiInfo)).data.api_id;
		newChild.value.id = new_api_id;

		data.children.push(newChild.value);
		dataSource.value = [...dataSource.value];
		showInputBox.value = [...showInputBox.value, false];
	}
};
// 删除目录、接口
const remove = (node: Node, data: Tree, type: number) => {
	if (type === 0) {
		ElMessageBox.confirm('确定要删除该目录吗？会顺带删除掉该目录下的所有内容哦')
			.then(async (action: string) => {
				if (action === 'confirm') {
					const parent = node.parent;
					const children: Tree[] = parent.data.children || parent.data;
					const index = children.findIndex((d) => d.id === data.id);

					await deleteDictionary({
						dictionary_id: data.id,
					});
					children.splice(index, 1);
					dataSource.value = [...dataSource.value];
					showInputBox.value.splice(0, 1);
				}
			})
			.catch(() => {});
	} else {
		ElMessageBox.confirm('确定要删除该接口吗？')
			.then(async (action: string) => {
				if (action === 'confirm') {
					const parent = node.parent;
					const children: Tree[] = parent.data.children || parent.data;
					const index = children.findIndex((d) => d.id === data.id);

					await deleteApi({
						api_id: data.id,
					});
					children.splice(index, 1);
					dataSource.value = [...dataSource.value];
					showInputBox.value.splice(0, 1);

					// 将当前页面切换到根目录
					router.push({
						path: `/project/${route.params.project_id}`,
					});
				}
			})
			.catch(() => {});
	}
};
// 使用h函数自定义el-tree内部内容
const renderContent = (
	h: any,
	{
		node,
		data,
	}: {
		node: Node;
		data: Tree;
	}
) => {
	if (data.type === 'dictionary') {
		return h(
			'div',
			{
				class: 'custom-tree-node',
			},
			h('img', {
				src: '/src/static/svg/ProjectDetailsSideBarDictClosed.svg',
				style: 'width: 20px; height: 20px; margin-right: 8px',
			}),
			h(
				'span',
				{
					style: `
					  display: ${showInputBox.value[node.id] ? 'none' : 'inline-block'};
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						max-width: 100px;
					`,
					onDblclick: () => {
						if (data.label === '根目录') {
							ElMessage.error('根目录不可修改');
						} else {
							showInputBox.value[node.id] = true;
						}
					},
				},
				node.label
			),
			h('input', {
				type: 'text',
				placeholder: '请输入名称',
				value: node.label,
				style: `display: ${!showInputBox.value[node.id] ? 'none' : 'inline-block'}; width: 100px; height: 20px; margin-left: 8px`,
				onBlur: async () => {
					await updateDictionary({
						father_id: findParentId(dataSource.value[0], data.id),
						dictionary_id: data.id,
						dictionary_name: data.label,
					});
					showInputBox.value[node.id] = false;
				},
				onInput: (e: any) => {
					data.label = e.target.value;
				},
			}),
			h(
				'span',
				null,
				h('img', {
					src: '/src/static/svg/ProjectDetailsSideBarNewDict.svg',
					style: 'width: 20px; height: 20px;margin-left: 20px',
					onClick: () => append(data, 0),
				}),
				h('img', {
					src: '/src/static/svg/ProjectDetailsSideBarNewApi.svg',
					style: 'width: 20px; height: 20px;margin-left: 8px',
					onClick: () => append(data, 1),
				}),
				h('img', {
					src: '/src/static/svg/ProjectDetailsSideBarDelete.svg',
					style: `display: ${data.label === '根目录' ? 'none' : 'inline-block'};width: 20px; height: 20px; margin-left: 8px`,
					onClick: () => remove(node, data, 0),
				})
			)
		);
	} else {
		return h(
			'div',
			{
				class: 'custom-tree-node',
			},
			h('span', {}, `${data.type}-`),
			h(
				'span',
				{
					style: `
					  display: ${showInputBox.value[node.id] ? 'none' : 'inline-block'};
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						max-width: 100px;
					`,
					onDblclick: () => {
						showInputBox.value[node.id] = true;
					},
				},
				node.label
			),
			h('input', {
				type: 'text',
				placeholder: '请输入名称',
				value: node.label,
				style: `display: ${!showInputBox.value[node.id] ? 'none' : 'inline-block'}; width: 100px; height: 20px; margin-left: 8px`,
				onBlur: async () => {
					await updateApi({
						api_id: data.id,
						api_name: data.label,
						api_editor_id: JSON.parse(localStorage.getItem('userInfo') || '{}').id,
					});
					showInputBox.value[node.id] = false;
				},
				onInput: (e: any) => {
					data.label = e.target.value;
				},
			}),
			h('img', {
				src: '/src/static/svg/ProjectDetailsSideBarDelete.svg',
				style: 'width: 20px; height: 20px;margin-left: 8px',
				onClick: () => remove(node, data, 1),
			})
		);
	}
};
// 根据子节点id寻找父节点id
const findParentId = (tree: Tree, targetId: number, parentId?: number): number | null => {
	if (tree.id === targetId) {
		return parentId || null;
	}
	for (const child of tree.children) {
		const foundParentId = findParentId(child, targetId, tree.id);
		if (foundParentId !== null) {
			return foundParentId;
		}
	}
	return null;
};
// 切换到api详情页面
const checkoutApi = (node: Tree) => {
	if (node.type !== 'dictionary') {
		getInfo(node.id);
		router.push({
			path: `/project/${route.params.project_id}`,
			query: {
				api_id: node.id,
			},
		});
	}
};
const getInfo = async (thisId: number) => {
	await apiOperation.getApiInfo(thisId);
};

onBeforeMount(async () => {
	// dataSource.value = (await getProjectApiList({ project_id: Number(route.params.project_id) })).data.data;
	const res = await getProjectApiList({ project_id: Number(route.params.project_id) });
	dataSource.value = res.data.data;

	// 遍历目录树，获取到节点个数
	function countAllNodes(tree: Tree): number {
		let count = 1;
		if (tree.children.length !== 0) {
			for (const child of tree.children) {
				count += countAllNodes(child);
			}
		}
		return count;
	}
	showInputBox.value = new Array(countAllNodes(dataSource.value[0])).fill(false);
});
</script>

<style scoped lang="less">
.SideBar-wrap {
	width: 230px;
	border: 1px solid #bdbdbd;
	border-radius: 10px;
	overflow: hidden;
}

/* el-tree样式 */
:deep(.el-tree-node__content) {
	height: 50px;
	transition: all 0.3s;
}
:deep(.custom-tree-node) {
	display: flex;
	align-items: center;
}

/* el-dialog样式 */
:deep(.el-dialog) {
	border-radius: 20px;
}
:deep(.el-dialog__header) {
	display: flex;
	justify-content: center;
}
</style>
