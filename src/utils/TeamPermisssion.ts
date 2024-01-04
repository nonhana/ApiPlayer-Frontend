import { useStore } from '@/store';

export enum TeamRole {
	OWNER = 0,
	ADMIN = 1,
	MEMBER = 2,
	GUEST = 3,
}

const { permissionStore } = useStore();
const role = permissionStore.getTeamRole();

export function canEditTeam(): boolean {
	return role === TeamRole.OWNER;
}

export function canEditMember(): boolean {
	return role === TeamRole.OWNER || role === TeamRole.ADMIN;
}

export function canAccessTeam(): boolean {
	return role === TeamRole.OWNER || role === TeamRole.ADMIN || role === TeamRole.MEMBER;
}
