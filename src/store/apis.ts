import { defineStore } from 'pinia';
import { Names } from './store-name';
import { getApiInfo } from '@/api/apis.ts';

interface Request {
	api_desc: string;
	api_editor_id: number;
	api_env_url: number[];
	api_id: number;
	api_method: string;
	api_name: string;
	api_principal_id: number;
	api_request: ApiRequest[];
	api_response: ApiResponse[];
	api_status: number;
	api_url: string;
	dictionary_id: number;
}

interface ApiRequest {
	params_list?: ParamsList[];
	params_obj?: { [key: string]: any };
	type: number;
}
interface ParamsList {
	param_desc: string;
	param_name: string;
	param_type: number;
}

interface ApiResponse {
	http_status: number;
	response_body: string;
	response_name: string;
}

export const apiStore = defineStore('apiStore', {
	state: () => {
		return {
			apiInfo: {},
		};
	},
	persist: true,
	actions: {
		async getApiInfo(apiId: number) {
			const res = await getApiInfo(apiId);
			if (res.status == 200) {
				this.apiInfo = res.data.api_info;
			} else {
				return Promise.reject(res.data);
			}
		},
	},
});
