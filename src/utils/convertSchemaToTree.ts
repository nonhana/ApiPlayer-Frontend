// 前端拿来渲染的树形结构
export interface TreeNode {
	id: number;
	label: string;
	type: string;
	required: boolean;
	title: string;
	description: string;
	children?: TreeNode[];
	[key: string]: any;
}
// 后端传过来的JSON_Schema结构
export interface SchemaNode {
	type: string;
	title: string;
	description?: string;
	required?: string[];
	properties?: { [key: string]: SchemaNode };
	items?: SchemaNode;
}

// 将后端传过来的JSON_Schema结构转换成前端需要的树形结构
// 1. 异步
export const convertSchemaToTreeAsync = async (schema: SchemaNode, parentId: number, labelName: string): Promise<TreeNode> => {
	return new Promise<TreeNode>((resolve) => {
		const treeNode: TreeNode = {
			id: parentId,
			label: labelName,
			title: schema.title,
			type: schema.type,
			required: false,
			description: schema.description || '',
			children: [],
		};

		if (schema.type === 'array' && schema.items) {
			convertSchemaToTreeAsync(schema.items, parentId * 10 + 1, 'items').then((childNode) => {
				treeNode.children!.push(childNode);
				if (schema.required) {
					treeNode.required = true;
				}
				resolve(treeNode);
			});
		} else if (schema.type === 'object' && schema.properties) {
			const promises: Promise<void>[] = [];
			Object.keys(schema.properties).forEach((key, index) => {
				const promise = convertSchemaToTreeAsync(schema.properties![key], parentId * 10 + index + 1, key).then((childNode) => {
					treeNode.children!.push(childNode);
					if (schema.required && schema.required.includes(key)) {
						childNode.required = true;
					}
				});
				promises.push(promise);
			});
			Promise.all(promises).then(() => {
				resolve(treeNode);
			});
		} else {
			if (schema.required) {
				treeNode.required = true;
			}
			resolve(treeNode);
		}
	});
};
// 2. 同步
export const convertSchemaToTree = (schema: SchemaNode, parentId: number, labelName: string): TreeNode => {
	// 初始化树形结构
	const treeNode: TreeNode = {
		id: parentId,
		label: labelName,
		title: schema.title,
		type: schema.type,
		required: false,
		description: schema.description || '',
		children: [],
	};

	// 正确处理array类型和object类型，并根据required字段来判断是否必填
	if (schema.type === 'array' && schema.items) {
		const childNode = convertSchemaToTree(schema.items, parentId * 10 + 1, 'items');
		treeNode.children!.push(childNode);
		if (schema.required) {
			treeNode.required = true;
		}
	} else if (schema.type === 'object' && schema.properties) {
		Object.keys(schema.properties).forEach((key, index) => {
			const childNode = convertSchemaToTree(schema.properties![key], parentId * 10 + index + 1, key);
			treeNode.children!.push(childNode);
			if (schema.required && schema.required.includes(key)) {
				childNode.required = true;
			}
		});
	} else {
		if (schema.required) {
			treeNode.required = true;
		}
	}
	return treeNode;
};
