// src/api/teams/types/index.ts

export interface TeamIdentity {
	team_id: number;
	user_id: number;
	team_user_identity?: number;
	team_user_name?: string;
	team_project_indentity_list?: {
		project_id: number;
		project_user_identity: number;
	}[];
}

export interface TeamInfo {
	team_id: number;
	user_id: number;
	team_name?: string;
	team_desc?: string;
	team_user_name?: string;
}
