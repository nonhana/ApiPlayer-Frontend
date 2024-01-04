import { useStore } from '@/store';

const { permissionStore } = useStore();

export enum ProjectRole {
	ADMIN = 0,
	EDITOR = 1,
	READ_ONLY = 2,
	NO_ACCESS = 3,
}

const roleList: Map<number, ProjectRole> = permissionStore.getProjectRoleList();

export function canCreateProject(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN;
}
export function canDeleteProject(): boolean {
	return true;
}
export function canModifyProjectInfo(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN;
}
export function canBrowseApiDocs(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN || roleList.get(id) === ProjectRole.EDITOR || roleList.get(id) === ProjectRole.READ_ONLY;
}
export function canModifyApi(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN || roleList.get(id) === ProjectRole.EDITOR;
}
export function canRunApi(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN || roleList.get(id) === ProjectRole.EDITOR;
}
export function canModifyGlobalSettings(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN;
}
