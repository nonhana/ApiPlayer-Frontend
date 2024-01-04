// src/store/types/index.ts

/* ----------枚举类型定义---------- */
export enum teamConstance {
	TEAM_OWNER = 0,
	TEAM_MANAGER = 1,
	TEAM_MEMBER = 2,
	GUEST = 3,
}

export enum TeamRole {
	OWNER = 0,
	ADMIN = 1,
	MEMBER = 2,
	GUEST = 3,
}

export enum ProjectRole {
	ADMIN = 0,
	EDITOR = 1,
	READ_ONLY = 2,
	NO_ACCESS = 3,
}

/* ----------接口定义---------- */
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
	project_desc: string;
	last_access_time: string;
}

export interface MemberList {
	user_email: string;
	user_id: number;
	user_identity: number;
	user_img: string;
	user_name: string;
	user_team_name: string;
}

export interface ProjectList {
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

export interface TeamInfo {
	team_desc?: string;
	team_user_name?: string;
	team_id: number;
	team_name: string;
}

export interface TeamDetailedInfo {
	result_code: number;
	result_msg: string;
	member_list: MemberList[];
	project_list: ProjectList[];
	team_info: TeamInfo;
}

export interface ProjectInfo {
	project_current_type?: number;
	project_desc?: string;
	project_id?: number;
	project_img?: string;
	project_name?: string;
	team_id?: number;
	global_params?: any[];
	global_variables?: any[];
}

export interface ProjectState {
	teamRole: TeamRole;
	projectRoleList: Map<number, ProjectRole>;
}
