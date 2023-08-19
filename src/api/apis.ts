import myAxios from './axios';

export interface ApiAddInfo {
	dictionary_id: number;
	project_id: number;
	api_creator_id: number;
	api_editor_id: number;
}
export interface ApiUpdateInfo {
	api_id: number;
	api_editor_id: number;
	api_desc?: string;
	api_env_url?: number[];
	api_method?: string;
	api_name?: string;
	api_principal_id?: number;
	api_request?: ApiRequest[];
	api_response?: ApiResponse[];
	api_status?: number;
	api_url?: string;
	dictionary_id?: number;
}
export interface Execute {
	api_id: number;
	api_request_JSON: string;
	api_request_params: ApiRequestParam[];
}
export interface DeleteInfo {
	api_id: number;
}
export interface ApiRequest {
	params_list?: ParamsList[];
	params_obj?: { [key: string]: any };
	type: number;
}
export interface ParamsList {
	param_desc: string;
	param_name: string;
	param_type: number;
}
export interface ApiResponse {
	http_status: number;
	response_body: string;
	response_name: string;
}
export interface ApiRequestParam {
	params_list: ExecuteParamsList[];
	type: number;
}
export interface ExecuteParamsList {
	param_name: string;
	param_value: string;
}

// 获取api数据
// export const getApiInfo = (apiid: string) => {
// 	return myAxios({
// 		url: '/apis/apiinfo',
// 		method: 'GET',
// 		params: {
// 			api_id: apiid,
// 		},
// 	});
// };

export const getApiInfo = () => {
	return myAxios({
		url: '/apis/apiinfo',
		method: 'GET',
	});
};

// 新建Api
export const addApi = (paramsList: ApiAddInfo) => {
	return myAxios({
		url: '/apis/addapi',
		method: 'POST',
		data: paramsList,
	});
};

// 更新接口
export const updateApi = (updateApiInfo: ApiUpdateInfo) => {
	return myAxios({
		url: '/apis/updateapi',
		method: 'POST',
		data: updateApiInfo,
	});
};

// 删除api
export const deleteApi = (deleteInfo: DeleteInfo) => {
	return myAxios({
		url: '/apis/deleteapi',
		method: 'POST',
		data: deleteInfo,
	});
};

// 运行api
export const executeApi = (executeInfo: Execute) => {
	return myAxios({
		url: '/apis/executeapi',
		method: 'POST',
		data: executeInfo,
	});
};
