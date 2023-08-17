import myAxios from './axios';
// 如果是GET请求，参数就是params；如果是POST请求，参数就是data

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

interface Execute {
	api_id: number;
	api_request_JSON: string;
	api_request_params: ApiRequestParam[];
}

interface DeleteInfo {
	api_id: number;
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

interface ApiRequestParam {
	params_list: ExecuteParamsList[];
	type: number;
}

interface ExecuteParamsList {
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

// 更新接口
export const updateApi = (updateApiInfo: Request) => {
	return myAxios({
		url: '/apis/updateapi',
		method: 'POST',
		data: updateApiInfo,
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

// 删除api
export const deleteApi = (deleteInfo: DeleteInfo) => {
	return myAxios({
		url: '/apis/deleteapi',
		method: 'POST',
		data: deleteInfo,
	});
};
