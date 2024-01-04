import { defineStore } from 'pinia';
import { ProjectRole, ProjectState, TeamRole } from '../types';

export const usePermissionStore = defineStore('permissionStore', {
	state: (): ProjectState => ({
		teamRole: TeamRole.GUEST,
		projectRoleList: new Map<number, ProjectRole>(),
	}),

	actions: {
		getProjectRoleList(): Map<number, ProjectRole> {
			return this.projectRoleList;
		},
		setProjectRoleList(projectRoleList: Map<number, ProjectRole>): void {
			this.projectRoleList = projectRoleList;
		},
		getTeamRole(): TeamRole {
			return this.teamRole;
		},
		setTeamRole(role: TeamRole): void {
			this.teamRole = role;
		},
	},
	persist: true,
});
