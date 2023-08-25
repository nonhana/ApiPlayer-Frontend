import { usePermisssiontStore } from '@/store/permissons';

// export enum ProjectRole {
// 	ADMIN = 'Admin',
// 	EDITOR = 'Editor',
// 	READ_ONLY = 'ReadOnly',
// 	NO_ACCESS = 'NoAccess',
// }

export enum ProjectRole {
	ADMIN = 0,
	EDITOR = 1,
	READ_ONLY = 2,
	NO_ACCESS = 3,
}

const baseStore = usePermisssiontStore();
const roleList: Map<number, ProjectRole> = baseStore.getProjectRoleList();

export function canCreateProject(id: number): boolean {
	return roleList.get(id) === ProjectRole.ADMIN;
}
export function canDeleteProject(id: number): boolean {
	console.log(roleList);
	// console.log(roleList.has(id) && roleList.get(id), '-----', ProjectRole.ADMIN);
	return true;
	// return roleList.get(id) === ProjectRole.ADMIN;
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
