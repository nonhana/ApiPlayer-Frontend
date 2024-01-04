import { useBaseStore } from './modules/base';
import { useApiStore } from './modules/apis';
import { usePermissionStore } from './modules/permissons';

export function useStore() {
	return {
		baseStore: useBaseStore(),
		apiStore: useApiStore(),
		permissionStore: usePermissionStore(),
	};
}
