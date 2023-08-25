import { defineStore } from 'pinia';
import { Names } from './store-name';
import { teamInfo } from '@/api/teams';

interface UserInfo {
	user_id: number;
	user_name: string;
	user_img: string;
	user_email: string;
	user_phone: string;
	user_sign: string;
}
interface RecentlyVisitedListItem {
	project_id: number;
	project_name: string;
	project_img: string;
	project_desc: string;
	last_access_time: string;
}
interface MemberList {
	user_email: string;
	user_id: number;
	user_identity: number;
	user_img: string;
	user_name: string;
	user_team_name: string;
}
interface ProjectList {
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
interface TeamInfo {
	team_desc?: string;
	team_user_name?: string;
	team_id: number;
	team_name: string;
}
interface TeamDetailedInfo {
	result_code: number;
	result_msg: string;
	member_list: MemberList[];
	project_list: ProjectList[];
	team_info: TeamInfo;
}
interface ProjectInfo {
	project_current_type?: number;
	project_desc?: string;
	project_id?: number;
	project_img?: string;
	project_name?: string;
	team_id?: number;
}

const teamConstance = {
	TEAM_OWNER: 0,
	TEAM_MANAGER: 1,
	TEAM_MEMBER: 2,
	GUEST: 3,
};

export const useBaseStore = defineStore(Names.Base, {
	state: () => {
		return {
			user_info: <UserInfo>{},
			lastVisitedList: [] as RecentlyVisitedListItem[],
			teamInfo: [] as TeamInfo[],
			teamDetailedInfo: <TeamDetailedInfo>{},
			teamIdentity: <number>0,
			curTeamInfo: <TeamInfo>{},
			curProjectInfo: <ProjectInfo>{},
		};
	},

	getters: {
		inviteMemberBtnVisible(): boolean {
			const { TEAM_OWNER, TEAM_MANAGER } = teamConstance;
			return [TEAM_OWNER, TEAM_MANAGER].includes(this.teamIdentity);
		},
		disbandBtnVisible(): boolean {
			const { TEAM_OWNER } = teamConstance;
			return [TEAM_OWNER].includes(this.teamIdentity);
		},
		teamSettingBtnVisible(): boolean {
			const { TEAM_OWNER, TEAM_MANAGER, TEAM_MEMBER } = teamConstance;
			return [TEAM_OWNER, TEAM_MANAGER, TEAM_MEMBER].includes(this.teamIdentity);
		},
	},
	actions: {
		setUserInfo(info: UserInfo) {
			this.user_info = info;
		},
		setLastVisitedList(list: RecentlyVisitedListItem[]) {
			this.lastVisitedList = list;
		},
		setTeamInfo(info: TeamInfo[]) {
			this.teamInfo = info;
		},
		setTeamDetailedInfo(info: TeamDetailedInfo) {
			this.teamDetailedInfo = info;
		},
		setCurTeamInfo(info: TeamInfo) {
			this.curTeamInfo = info;
		},
		setCurProjectInfo(info: ProjectInfo) {
			this.curProjectInfo = info;
		},
		// 获取团队信息
		async getTeamInfo(team_id: number): Promise<void> {
			const res = await teamInfo({ team_id });
			const team_user_name = res.data.member_list.find((item: any) => item.user_id === this.user_info.user_id).user_team_name;
			const userIdentity = res.data.member_list.find((item: any) => item.user_id === this.user_info.user_id).user_identity;
			this.setTeamDetailedInfo(res.data);
			this.setCurTeamInfo({
				...res.data.team_info,
				team_user_name,
			});
			this.teamIdentity = userIdentity;
		},
	},
	persist: true,
});
