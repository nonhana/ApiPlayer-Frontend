//com.spec.js
import { mount } from '@vue/test-utils';
import CommonAside from '../src/components/CommonAside.vue';

describe('CommonAside', () => {
	test('CommonAside Check Tabs Currectly', () => {
		const wrapper = mount(CommonAside);

		// 点击按钮后，切换到下一个 tab
		const button = wrapper.find('button');
		button.trigger('click');

		wrapper.unmount();
	});
});
