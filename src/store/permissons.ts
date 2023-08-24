import { defineStore } from 'pinia';
import { TeamRole } from '@/utils/TeamPermisssion';
import { ProjectRole } from '@/utils/projectPermission';

interface ProjectState {
	teamRole: TeamRole;
	projectRole: ProjectRole;
}

export const usePermisssiontStore = defineStore({
	id: 'permissions',
	state: (): ProjectState => ({
		teamRole: TeamRole.GUEST,
		projectRole: ProjectRole.NO_ACCESS,
	}),
	getters: {
		canCreateProject(): boolean {
			return this.projectRole === ProjectRole.ADMIN;
		},
		canDeleteProject(): boolean {
			return this.projectRole === ProjectRole.ADMIN;
		},
		canModifyProjectInfo(): boolean {
			return this.projectRole === ProjectRole.ADMIN;
		},
		canBrowseApiDocs(): boolean {
			return this.projectRole === ProjectRole.ADMIN || this.projectRole === ProjectRole.EDITOR || this.projectRole === ProjectRole.READ_ONLY;
		},
		canModifyApi(): boolean {
			return this.projectRole === ProjectRole.ADMIN || this.projectRole === ProjectRole.EDITOR;
		},
		canRunApi(): boolean {
			return this.projectRole === ProjectRole.ADMIN || this.projectRole === ProjectRole.EDITOR;
		},
		canModifyGlobalSettings(): boolean {
			return this.projectRole === ProjectRole.ADMIN;
		},
	},
	actions: {
		getProjectRole(): ProjectRole {
			return this.projectRole;
		},
		setProjectRole(projectRole: ProjectRole): void {
			this.projectRole = projectRole;
		},
		getTeamRole(): TeamRole {
			return this.teamRole;
		},
		setTeamRole(role: TeamRole): void {
			this.teamRole = role;
		},
	},
});
