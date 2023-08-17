import myAxios from './axios';

export interface ApiInfo {
	/**
	 * 接口创建者的id
	 */
	api_creator_id: number;
	/**
	 * 接口说明
	 */
	api_desc: string;
	/**
	 * 接口编辑人的id
	 */
	api_editor_id: number;
	/**
	 * 接口前置url，详情用法见：获取某API具体信息
	 */
	api_env_url: number[];
	/**
	 * 接口请求方法，直接写字符串即可，比如GET方法就直接写'GET'。
	 */
	api_method: string;
	/**
	 * 接口名称
	 */
	api_name: string;
	/**
	 * 接口负责人的用户id
	 */
	api_principal_id: number;
	/**
	 * JSON格式的请求参数
	 */
	api_request_JSON: string;
	/**
	 * 接口请求参数
	 */
	api_request_params: ApiRequestParam[];
	/**
	 * 接口返回参数
	 */
	api_response: ApiResponse;
	/**
	 * 接口状态，0-开发中，1-测试中，2-已发布，3-将废弃
	 */
	api_status: number;
	/**
	 * 接口请求url地址
	 */
	api_url: string;
	/**
	 * 父级目录id
	 */
	dictionary_id: number;
	/**
	 * 所属项目id
	 */
	project_id: number;
}
export interface ApiRequestParam {
	/**
	 * 参数列表
	 */
	params_list?: ParamsList[];
	/**
	 * 请求参数顶层类型，0-Params，1-Body，2-Cookie，3-Header。此处以Params参数为例，也就是表格的形式来填写参数。
	 */
	type: number;
}
export interface ParamsList {
	/**
	 * 参数说明
	 */
	param_desc: string;
	/**
	 * 参数名称
	 */
	param_name: string;
	/**
	 * 参数类型
	 */
	param_type: number;
}
export interface ApiResponse {
	/**
	 * HTTP状态码
	 */
	http_status: number;
	/**
	 * 返回体，固定为JSON格式的字符串
	 */
	response_body: string;
	/**
	 * 返回名称
	 */
	response_name: string;
}

// 新建接口
export const addApi = (paramsList: ApiInfo) => {
	return myAxios({
		url: '/projects/addapi',
		method: 'POST',
		data: paramsList,
	});
};

// 更新接口
export const updateApi = (paramsList: any) => {
	return myAxios({
		url: '/projects/updateapi',
		method: 'POST',
		data: paramsList,
	});
};

// 删除接口
export const deleteApi = (paramsList: { api_id: number }) => {
	return myAxios({
		url: '/projects/deleteapi',
		method: 'POST',
		data: paramsList,
	});
};
