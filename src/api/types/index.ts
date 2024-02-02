// src/api/types/index.ts
// 用于定义公用请求类型

/**
 * 用户id（可选）
 */
export interface UserIdOpt {
	user_id?: number;
}

/**
 * 用户id（必选）
 */
export interface UserIdReq {
	user_id: number;
}

/**
 * 团队id
 */
export interface TeamId {
	team_id: number;
}

/**
 * 接口id
 */
export interface ApiId {
	api_id: number;
}

/**
 * 项目id
 */
export interface ProjectId {
	project_id: number;
}

/**
 * 目录id
 */
export interface DictionaryId {
	dictionary_id: number;
}

/**
 * Api目录列表item
 */
export interface ApiListItem {
	/**
	 * 接口id
	 */
	id: number;
	/**
	 * 接口名称
	 */
	label: string;
	/**
	 * 接口类型
	 */
	type: 'dictionary' | 'GET' | 'POST' | 'PUT' | 'DELETE';
	/**
	 * 如果是目录，children属性存放子目录列表；如果是接口，children是空数组
	 */
	children: ApiListItem[];
}

/**
 * Api请求参数列表
 */
export interface ApiRequestParam {
	/**
	 * 0-Params，1-Body(form-data)，2-Body(x-www-form-unlencoded)，3-Cookie，4-Header
	 */
	type: number;
	params_list: ParamsList[];
}

/**
 * 参数列表item
 */
interface ParamsList {
	param_desc?: string;
	param_name?: string;
	param_type?: number;
	param_value?: string | number;
}

/**
 * Api返回体结构
 */
export interface ApiResponse {
	http_status: number;
	response_body: string;
	response_name: string;
}
