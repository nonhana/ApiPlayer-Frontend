import { defineStore } from 'pinia';
// import { TeamRole } from '@/utils/TeamPermisssion';
// import { ProjectRole } from '@/utils/projectPermission';

enum TeamRole {
	OWNER = 0,
	ADMIN = 1,
	MEMBER = 2,
	GUEST = 3,
}

enum ProjectRole {
	ADMIN = 0,
	EDITOR = 1,
	READ_ONLY = 2,
	NO_ACCESS = 3,
}

interface ProjectState {
	teamRole: TeamRole;
	projectRoleList: Map<number, ProjectRole>;
}

export const usePermisssiontStore = defineStore({
	id: 'permissions',
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
