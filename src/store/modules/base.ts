import { defineStore } from 'pinia';
import { teamInfo } from '@/api/teams';
import { teamConstance, UserInfo, RecentlyVisitedListItem, TeamInfo, TeamDetailedInfo, ProjectInfo } from '../types';

export const useBaseStore = defineStore('baseStore', {
	state: () => {
		return {
			user_info: <UserInfo>{},
			lastVisitedList: <RecentlyVisitedListItem[]>[],
			teamInfo: <TeamInfo[]>[],
			teamDetailedInfo: <TeamDetailedInfo>{},
			teamIdentity: <number>0,
			curTeamInfo: <TeamInfo>{},
			curProjectInfo: <ProjectInfo>{},
			projectRoleList: <Record<number, number>>{},
			localIp: <string>'',
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
			const team_user_name = res.result.member_list.find((item) => item.user_id === this.user_info.user_id)!.user_team_name;
			const userIdentity = res.result.member_list.find((item) => item.user_id === this.user_info.user_id)!.user_identity;
			this.setTeamDetailedInfo(res.result);
			this.setCurTeamInfo({
				...res.result.team_info,
				team_user_name,
			});
			this.teamIdentity = userIdentity;
		},
		setProjectRoleList(projectRoleList: Record<number, number>): void {
			this.projectRoleList = projectRoleList;
		},
		setLocalIp(ip: string): void {
			this.localIp = ip;
		},
	},
	persist: true,
});
