import { defineStore } from 'pinia';
import { Names } from './store-name';

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
}

interface ProjectList {
	project_id: number;
	project_img: string;
	project_name: string;
}

interface TeamInfo {
	team_desc?: string;
	team_id: number;
	team_name: string;
	team_user_name?: string;
}
interface TeamDetailedInfo {
	member_list: MemberList[];
	project_list: ProjectList[];
	result_code: number;
	result_msg: string;
	team_info: TeamInfo;
}

export const useBaseStore = defineStore(Names.Base, {
	state: () => {
		return {
			user_info: <UserInfo>{},
			lastVisitedList: [] as RecentlyVisitedListItem[],
			teamInfo: [] as TeamInfo[],
			teamDetailedInfo: <TeamDetailedInfo>{},
		};
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
	},
	persist: true,
});
