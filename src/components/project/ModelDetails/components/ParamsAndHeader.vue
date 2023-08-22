<template>
	<div>
		<vxe-table
			ref="tableRef"
			border
			show-overflow
			:data="tableData"
			:column-config="{ resizable: true }"
			:menu-config="menuConfig"
			:edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
			@menu-click="contextMenuClickEvent"
		>
			<vxe-column width="200" field="param_name" title="参数名" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="{ row }">
					<vxe-input v-model="row.param_name" type="text"></vxe-input>
				</template>
			</vxe-column>
			<vxe-column width="200" field="param_type" title="类型" :edit-render="{}">
				<template #default="{ row }">
					<span>{{ formatType(row.param_type) }}</span>
				</template>
				<template #edit="{ row }">
					<vxe-select v-model="row.param_type" transfer>
						<vxe-option v-for="item in typeList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
					</vxe-select>
				</template>
			</vxe-column>
			<vxe-column width="300" field="param_desc" title="说明" :edit-render="{}">
				<template #edit="{ row }">
					<vxe-input v-model="row.param_desc" type="text" placeholder="请输入昵称"></vxe-input>
				</template>
			</vxe-column>
			<vxe-column title="操作" width="100" show-overflow>
				<template #default="{ row }">
					<vxe-button type="text" icon="vxe-icon-add" @click="insertEvent(row)"></vxe-button>
					<vxe-button type="text" icon="vxe-icon-delete" @click="removeEvent(row)"></vxe-button>
				</template>
			</vxe-column>
		</vxe-table>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from 'vxe-table';

interface RowVO {
	param_name: string;
	param_type: string;
	param_desc: string;
}
const tableRef = ref<VxeTableInstance<RowVO>>();

const tableData = ref<RowVO[]>([
	{
		param_name: '写件查细声当',
		param_type: '0',
		param_desc: 'ut',
	},
	{
		param_name: '起七做从',
		param_type: '1',
		param_desc: 'et ad sint cupidatat enim',
	},
]);

const typeList = ref([
	{ label: '', value: '' },
	{ label: 'number', value: '0' },
	{ label: 'integer', value: '1' },
	{ label: 'string', value: '2' },
	{ label: 'array', value: '3' },
]);

const formatType = (value: string) => {
	if (value === '0') {
		return 'number';
	}
	if (value === '1') {
		return 'integer';
	}
	if (value === '2') {
		return 'string';
	}
	if (value === '3') {
		return 'array';
	}
	return '';
};
const menuConfig = reactive<VxeTablePropTypes.MenuConfig<RowVO>>({
	body: {
		options: [
			[
				{ code: 'insertAt', name: '插入', disabled: false },
				{ code: 'remove', name: '删除', disabled: false },
			],
		],
	},
	visibleMethod({ options, column }) {
		const isDisabled = !column;
		options.forEach((list) => {
			list.forEach((item) => {
				item.disabled = isDisabled;
			});
		});
		return true;
	},
});

const contextMenuClickEvent: VxeTableEvents.MenuClick<RowVO> = ({ menu, row }) => {
	const $table = tableRef.value;
	if ($table) {
		switch (menu.code) {
			case 'insertAt':
				$table.insertAt({}, -1).then(({ row }) => {
					$table.setEditCell(row, 'name');
				});
				break;
			case 'remove':
				$table.remove(row);
				break;
		}
	}
};

const removeEvent = async (row: RowVO) => {
	const $table = tableRef.value;
	if ($table) {
		$table.remove(row);
	}
};

const insertEvent = async (row: RowVO) => {
	const $table = tableRef.value;

	if ($table) {
		$table.insertAt({}, row || -1).then(({ row }) => {
			$table.setEditCell(row, 'name');
		});
	}
};
</script>
