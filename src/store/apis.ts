import { defineStore } from 'pinia';
import { getApiInfo } from '@/api/apis';

export const apiStore = defineStore('apiStore', {
	state: () => {
		return {
			apiInfo: <any>{},
		};
	},
	actions: {
		async getApiInfo(apiId: number) {
			const res = await getApiInfo({
				api_id: apiId,
			});
			this.apiInfo = res.data.api_info;
		},
	},
	persist: true,
});
