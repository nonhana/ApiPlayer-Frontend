// ResponseCard.spec.js
import { mount } from '@vue/test-utils';
import ResponseCard from '../src/components/project/ModelDetails/components/ResponseCard.vue';

describe('ResponseCard', () => {
	// 测试主要内容：ResponseCard.vue组件在渲染的时候是否正常的从父组件接收到JSON_Schema字符串并解析成能够被el-tree组件渲染的树形结构
	test('ResponseCard get JSON_Schema data and analyze to the tree which can be rendered successfully', () => {
		const wrapper = mount(ResponseCard, {
			props: {
				context: {
					response_id: 132,
					http_status: 200,
					response_name: '成功',
					response_body: {
						root: {
							type: 'object',
							required: ['field_0_2', 'field_0_3', 'field_0_4'],
							properties: {
								field_0_2: {
									type: 'string',
								},
								field_0_3: {
									type: 'string',
								},
								field_0_4: {
									type: 'string',
								},
							},
						},
					},
				},
			},
		});
		// 检测treeData中是否有数据
		expect(wrapper.vm.treeData).not.toBeNull();
		/**
		 * 检测treeData中的数据是否符合结构：
		 * interface TreeNode {
		 * id: number;
		 * label: string;
		 * type: string;
		 * required: boolean;
		 * title: string;
		 * description: string;
		 * children?: TreeNode[];
		 * [key: string]: any;
		 * }
		 */
		expect(wrapper.vm.treeData[0]).toHaveProperty('id');
		expect(wrapper.vm.treeData[0]).toHaveProperty('label');
		expect(wrapper.vm.treeData[0]).toHaveProperty('type');
		expect(wrapper.vm.treeData[0]).toHaveProperty('required');
		expect(wrapper.vm.treeData[0]).toHaveProperty('title');
		expect(wrapper.vm.treeData[0]).toHaveProperty('description');
		expect(wrapper.vm.treeData[0]).toHaveProperty('children');
		wrapper.unmount();
	});
});
