// src/utils/types/index.ts

export interface UserInfo {
	user_id: number;
	user_name: string;
	user_img: string;
	user_email: string;
	user_phone: string;
	user_sign: string;
}

export interface RecentlyVisitedListItem {
	project_id: number;
	project_name: string;
	project_img: string;
	project_visited_date: string;
}

export interface EnvItem {
	env_type: number;
	env_name: string;
	env_baseurl: string;
}

export interface ParamItem {
	param_id?: number;
	param_name: string;
	param_type: string;
	param_value: number | string;
	param_desc: string;
}

export interface GlobalParamItem {
	type: number;
	params_list: ParamItem[];
}

export interface GlobalVariableItem {
	variable_id?: number;
	variable_name: string;
	variable_type: string;
	variable_value: number | string;
	variable_desc: string;
}

export interface HistoryItem {
	createdAt: string;
	project_id: number;
	version_id: number;
	version_type: string;
	version_msg: string;
	user_id: number;
	user_name: string;
	user_avatar: string;
}

export interface Tree {
	id: number;
	label: string;
	type: string;
	children: Tree[];
}

export interface RequestParams {
	type: number;
	params_list: Array<{
		param_name?: string;
		param_type?: number;
		param_desc?: string;
		param_value?: string | number;
	}>;
}

export interface ProjectInfo {
	project_current_type?: number;
	project_desc?: string;
	project_id?: number;
	project_img?: string;
	project_name?: string;
	team_id?: number;
}

export interface Project {
	project_id: number;
	project_img: string;
	project_name: string;
	project_member_list: Array<{
		user_id: number;
		user_name: string;
		user_img: string;
		user_email: string;
		user_identity: number;
	}>;
}

export interface User {
	id: number;
	avatar: string;
	email: string;
	name: string;
	team_name: string;
	tag: string;
	projectAbility: {
		image: string;
		title: string;
		ability: string;
	}[];
}

export interface AddProjectForm {
	user_id: number;
	team_id: number;
	project_name: string;
	project_img: string;
}
