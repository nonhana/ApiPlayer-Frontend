// src/api/teams/types/index.ts
// 用于定义所有与团队相关的请求类型

/* ----------请求体定义---------- */
/**
 * 新建团队请求体
 */
export interface CreateTeamReq {
	/**
	 * 团队名称
	 */
	team_name: string;
	/**
	 * 团队描述
	 */
	team_desc: string;
	/**
	 * 用户在团队中的名称
	 */
	team_user_name: string;
}
/**
 * 更新团队信息请求体
 */
export interface UpdateTeamInfoReq {
	/**
	 * 团队id
	 */
	team_id: number;
	/**
	 * 用户id
	 */
	user_id: number;
	/**
	 * 团队描述
	 */
	team_desc?: string;
	/**
	 * 团队名称
	 */
	team_name?: string;
	/**
	 * 团队里面用户的名称
	 */
	team_user_name?: string;
}
/**
 * 邀请用户加入团队请求体
 */
export interface InviteUserReq {
	/**
	 * 团队id
	 */
	team_id: number;
	/**
	 * 用户id
	 */
	user_id: number;
	/**
	 * 用户在团队中的名称
	 */
	team_user_name: string;
}
/**
 * 设置成员权限请求体
 */
export interface SetMemberIdentityReq {
	/**
	 * 团队id
	 */
	team_id: number;
	/**
	 * 用户id
	 */
	user_id: number;
	/**
	 * 用户在团队中的身份
	 */
	team_user_identity?: number;
	/**
	 * 用户在团队中的用户名
	 */
	team_user_name?: string;
	/**
	 * 用户的对这个团队项目的权限列表
	 */
	team_project_indentity_list?: {
		/**
		 * 项目id
		 */
		project_id: number;
		/**
		 * 项目权限，0-管理员，1-编辑者，2-只读成员，3-禁止访问
		 */
		project_user_identity: number;
	}[];
}
/**
 * 移除某成员请求体
 */
export interface RemoveMemberReq {
	/**
	 * 团队id
	 */
	team_id: number;
	/**
	 * 用户id
	 */
	user_id: number;
}
/* ----------返回数据体定义---------- */
/**
 * 团队列表item信息
 */
export interface TeamItem {
	/**
	 * 团队id
	 */
	team_id: number;
	/**
	 * 团队名称
	 */
	team_name: string;
	/**
	 * 团队描述
	 */
	team_desc: string;
	/**
	 * 用户在团队中的身份
	 */
	team_user_identity?: number;
}
/**
 * 团队成员item信息
 */
export interface TeamMemberItem {
	/**
	 * 用户id
	 */
	user_id: number;
	/**
	 * 用户名
	 */
	username: string;
	/**
	 * 用户头像
	 */
	avatar: string;
	/**
	 * 用户邮箱
	 */
	email: string;
	/**
	 * 用户在团队中的名称
	 */
	team_user_name: string;
	/**
	 * 用户在团队中的身份
	 */
	team_user_identity: number;
}
/**
 * 团队项目item信息
 */
export interface TeamProjectItem {
	/**
	 * 项目id
	 */
	project_id: number;
	/**
	 * 项目名称
	 */
	project_name: string;
	/**
	 * 项目图片
	 */
	project_img: string;
}
/**
 * 团队项目成员item信息
 */
export interface TeamProjectMemberItem {
	/**
	 * 用户id
	 */
	user_id: number;
	/**
	 * 用户名
	 */
	username: string;
	/**
	 * 用户头像
	 */
	avatar: string;
	/**
	 * 用户邮箱
	 */
	email: string;
	/**
	 * 用户在项目中的身份
	 */
	project_user_identity: number;
}
export interface MemberListFormattedItem {
	user_id: number;
	user_name: string;
	user_team_name: string;
	user_img: string;
	user_email: string;
	user_identity: number;
}
export interface ProjectListFormattedItem {
	project_id: number;
	project_name: string;
	project_img: string;
	project_member_list: ProjectListFormattedMemberItem[];
}
export interface ProjectListFormattedMemberItem {
	user_id: number;
	user_name: string;
	user_img: string;
	user_email: string;
	user_identity: number;
}
export interface BasicTeamInfo {
	team_id: number;
	team_name: string;
	team_desc: string;
	team_user_name?: string;
}
/**
 * 团队详细信息
 */
export interface DetailTeamInfo {
	member_list: MemberListFormattedItem[];
	project_list: ProjectListFormattedItem[];
	team_info: BasicTeamInfo;
}
