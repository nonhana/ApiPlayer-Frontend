import { usePermisssiontStore } from '@/store/permissons';

// export enum TeamRole {
// 	OWNER = 'Owner',
// 	ADMIN = 'Admin',
// 	MEMBER = 'Member',
// 	GUEST = 'Guest',
// }

export enum TeamRole {
	OWNER = 0,
	ADMIN = 1,
	MEMBER = 2,
	GUEST = 3,
}

const baseStore = usePermisssiontStore();
const role = baseStore.getTeamRole();

export function canEditTeam(): boolean {
	// const role = getUserRole();
	return role === TeamRole.OWNER;
}

export function canEditMember(): boolean {
	return role === TeamRole.OWNER || role === TeamRole.ADMIN;
}

export function canAccessTeam(): boolean {
	return role === TeamRole.OWNER || role === TeamRole.ADMIN || role === TeamRole.MEMBER;
}
