// src/api/apis/types/index.ts

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
	project_id: number;
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
	param_name?: string;
	param_type?: number;
	param_desc?: string;
	param_value?: string | number;
}
