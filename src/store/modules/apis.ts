import { defineStore } from 'pinia';
import { getApiInfo } from '@/api/apis';
import type { ApiDetailInfo } from '@/api/apis/types';

export const useApiStore = defineStore('apiStore', {
	state: () => {
		return {
			apiInfo: <ApiDetailInfo>{},
			preUrl: <string>'',
		};
	},
	actions: {
		async getApiInfo(apiId: number) {
			const res = await getApiInfo({
				api_id: apiId,
			});
			this.apiInfo = res.result;
		},
		setPreUrl(preUrl: string) {
			this.preUrl = preUrl;
		},
	},
	persist: true,
});
