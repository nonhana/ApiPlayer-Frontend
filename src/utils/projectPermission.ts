import { usePermisssiontStore } from '@/store/permissons';

export enum ProjectRole {
	ADMIN = 'Admin',
	EDITOR = 'Editor',
	READ_ONLY = 'ReadOnly',
	NO_ACCESS = 'NoAccess',
}

const baseStore = usePermisssiontStore();
const role = baseStore.getProjectRole();

export function canCreateProject(): boolean {
	return role === ProjectRole.ADMIN;
}
export function canDeleteProject(): boolean {
	return role === ProjectRole.ADMIN;
}
export function canModifyProjectInfo(): boolean {
	return role === ProjectRole.ADMIN;
}
export function canBrowseApiDocs(): boolean {
	return role === ProjectRole.ADMIN || role === ProjectRole.EDITOR || role === ProjectRole.READ_ONLY;
}
export function canModifyApi(): boolean {
	return role === ProjectRole.ADMIN || role === ProjectRole.EDITOR;
}
export function canRunApi(): boolean {
	return role === ProjectRole.ADMIN || role === ProjectRole.EDITOR;
}
export function canModifyGlobalSettings(): boolean {
	return role === ProjectRole.ADMIN;
}
