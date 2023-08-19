<template>
	<div class="add-folder" @click="addNodeTreeList">
		<span class="add-folder-span">
			<svg-icon icon-class="addIcon"></svg-icon>
			新增一级
		</span>
	</div>
	<div class="all">全部分类</div>
	<div class="tree-show">
		<el-tree
			ref="treeRef"
			:data="treeList"
			node-key="id"
			:props="defaultProps"
			:default-expand-all="nodeShow"
			:default-expanded-keys="defaultExpandedkeys"
			accordion
			@node-click="handleNodeClick"
			@node-collapse="nodeCollapse"
		>
			<template #default="{ node, data }">
				<div class="custom-tree-node">
					<span v-if="!data.isAddNode">{{ node.label }}</span>
					<el-dropdown v-if="!data.isAddNode" class="edit-tree-dropdown">
						<span>
							<a class="showEllipsis"> ... </a>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item><span @click.stop="addAllNode(node, data)">新增</span></el-dropdown-item>
								<el-dropdown-item @click.stop="editAllNode(node, data)">编辑</el-dropdown-item>
								<el-dropdown-item @click.stop="delAllNode(node, data)">删除</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					//点击新增时的输入框
					<el-input
						v-if="data.isAddNode"
						ref="addRef"
						v-model="newChildNode"
						class="add-new-child-node"
						@keyup.enter.stop="handleAddEnter(node, data)"
						@blur="removeTreeNode(node, data)"
						@change="handleAddNode(node, data)"
					>
					</el-input>
					//点击修改时的输入框
					<el-input
						v-show="data.isEditNode"
						v-model="data.name"
						class="edit-child-node"
						@change="handleEditNode(node, data)"
						@keyup.enter.stop="handleEditEnter(node.data)"
					>
					</el-input>
				</div>
			</template>
		</el-tree>

		<!-- //点击新增一级显示的输入框 -->
		<div v-if="inputShow" class="add-input">
			<el-input v-model="addNodeTree" ref="newNodeRef" placeholder="输入中" @change="addClassification" @keyup.enter.stop="handleEnter"></el-input>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue';
// 获取列表
interface Tree {
	id: number;
	label: string;
	children?: Tree[];
}
let id = 1000;
const treeList = ref<Tree[]>([
	{
		id: 1,
		label: 'Level one 1',
		children: [
			{
				id: 4,
				label: 'Level two 1-1',
				children: [
					{
						id: 9,
						label: 'Level three 1-1-1',
					},
					{
						id: 10,
						label: 'Level three 1-1-2',
					},
				],
			},
		],
	},
	{
		id: 2,
		label: 'Level one 2',
		children: [
			{
				id: 5,
				label: 'Level two 2-1',
			},
			{
				id: 6,
				label: 'Level two 2-2',
			},
		],
	},
	{
		id: 3,
		label: 'Level one 3',
		children: [
			{
				id: 7,
				label: 'Level two 3-1',
			},
			{
				id: 8,
				label: 'Level two 3-2',
			},
		],
	},
]);

const getTreeList = () => {
	// http.get('/获取树列表接口').then((res) => {
	// 	treeList.value = res.data.children;
	// 	filterAddParms(treeList.value, 'isOper');
	// });
};

//点击树节点时触发的方法
const input = ref('');
const parentId = ref('');
const handleNodeClick = (node, data) => {
	parentId.value = node.parentId;
};
const treeRef = ref('');
// 点击新增一级（新增一级时parentid默认为0）
const newNodeRef = ref(null);
const addNodeTree = ref('');
const inputShow = ref(false);
const addNodeTreeList = () => {
	inputShow.value = true;
	setTimeout(() => {
		newNodeRef.value && newNodeRef.value.focus();
	}, 800);
};

//新增一级出现输入框时通过change事件输入内容请求方法添加节点
const addClassification = () => {
	const data = {
		name: addNodeTree.value,
		parentId: 0,
	};
	console.log(addNodeTree.value === '');
	if (addNodeTree.value != '') {
		// http.post('新增一级保存接口', data).then((res) => {
		// 	console.log(res);
		// 	inputShow.value = false;
		// 	getTreeList();
		// 	addNodeTree.value = '';
		// });
	} else {
		inputShow.value = false;
	}
};
//此方法为用户在输入框不输入任何东西时回车输入框不显示
const handleEnter = () => {
	inputShow.value = false;
};

//节点被关闭时触发的事件，节点关闭时输入框也消失
const nodeCollapse = (data) => {
	console.log('data: ', data);
	// 如果有input框, 删除节点
	if (nodeShow.value) {
		data.children.pop();
		nodeShow.value = false;
	}
};

//点击新增，出现输入框
const nodeShow = ref(false);
const addRef = ref(null);
const newChildNode = ref('');
const addAllNode = (node, data) => {
	if (nodeShow.value) return;
	nodeShow.value = true;
	if (!data.children || !Array.isArray(data.children)) {
		data.children = [];
	}
	// 展开
	console.log('treeRef.value: ', data.id, treeRef.value);
	//使树形结构图展开
	node.expanded = true;
	//为了使输入框出现在最下层。为树结构添加节点
	nextTick(() => {
		data.children.push({
			isAddNode: true,
			isOper: null,
			name: '',
			parentId: data.id,
		});
		setTimeout(() => {
			addRef.value && addRef.value.focus();
		}, 800);
	});
	console.log('data: ', data);
};
// 删除节点。添加完节点后删除节点
function removeTreeNode(node, data) {
	const parent = node.parent;
	const children = parent.data.children || parent.data;
	const index = children.findIndex((d) => d.id === data.id);
	children.splice(index, 1);
	treeList.value = [...treeList.value];
	nodeShow.value = false;
}
//输入框输入内容添加数据
const defaultExpandedkeys = ref([]);
const handleAddNode = (node, data) => {
	defaultExpandedkeys.value.push(node.data.parentId);
	const params = {
		parentId: data.parentId,
		name: newChildNode.value,
	};
	console.log('params: ', params);
	// http.post('点击新增接口', params).then((res) => {
	// 	console.log(addRef.value);
	// 	nextTick(() => {
	// 		data.isAddNode = false;
	// 		addRef.value && addRef.value.focus();
	// 	});
	// 	getTreeList();
	// 	newChildNode.value = '';
	// });
};
//此方法为用户在输入框不输入任何东西时回车输入框不显示
const handleAddEnter = (node, data) => {
	// if(data.isAddNode) return
	nextTick(() => {
		data.isAddNode = false;
		addRef.value && addRef.value.focus();
	});
};

//点击编辑，出现输入框
const editAllNode = (node, data) => {
	nextTick(() => {
		data.isEditNode = true;
	});
};
//编辑完之后请求接口保存编辑完的数据
const handleEditNode = (node, data) => {
	console.log('node: ', node);
	console.log(data);
	const editParams = {
		name: data.name,
		id: data.id,
		parentId: data.parentId,
	};
	console.log(editParams);
	// http.put('点击编辑接口', editParams).then((res) => {
	// 	nextTick(() => {
	// 		data.isEditNode = false;
	// 	});
	// 	getTreeList();
	// });
};
//此方法为用户在输入框不输入任何东西时回车输入框不显示
const handleEditEnter = (node, data) => {
	nextTick(() => {
		data.isEditNode = false;
	});
};

//删除节点
const delAllNode = (node, data) => {
	console.log('data: ', data);
	// nextTick(() => {
	//   data.isDelNode = true;
	// });
	// http.delete(`删除接口/${data.path}`).then((res) => {
	// 	console.log('res: ', res);
	// 	getTreeList();
	// });
};

const filterAddParms = (tree, paramsName) => {
	if (!tree || !Array.isArray(tree)) return null; // 出口 3-1
	return tree.map((item) => {
		// 2-4 1-4
		item[paramsName] = false; // 1-1, 2-1
		item.children = filterAddParms(item.children, paramsName); // 1-2 2-2
		return item; // 2-3 1-3
	});
};
</script>

<style scoped lang="less">
div {
	width: 1000px;
}
</style>
