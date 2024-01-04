// src/api/projects/types/index.ts

export interface EditProjectInfo {
	project_id: number;
	project_current_type?: number;
	project_desc?: string;
	project_img?: string;
	project_name?: string;
}

export interface ProjectGlobalInfo {
	project_id: number;
	env_list?: EnvList[];
	global_params?: GlobalParam[];
	global_variables?: GlobalVariable[];
}

export interface EnvList {
	env_type: number;
	env_baseurl: string;
}

export interface GlobalParam {
	type: number;
	params_list: ParamsList[];
}

export interface ParamsList {
	param_id?: number; // 如果有id，说明是已经存在的参数，否则是新增的参数
	param_desc: string;
	param_name: string;
	param_type: number;
	param_value: string;
	param_action_type: number; // 0-更新，1-插入，2-删除
}

export interface GlobalVariable {
	variable_id?: number; // 如果有id，说明是已经存在的参数，否则是新增的参数
	variable_desc: string;
	variable_name: string;
	variable_type: number;
	variable_value: string;
	variable_action_type: number; // 0-更新，1-插入，2-删除
}
