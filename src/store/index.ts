import { defineStore } from 'pinia';
import { Names } from './store-name';

interface UserInfo {
	user_id: number;
	user_name: string;
	user_img: string;
	user_email: string;
	user_phone: string;
	user_sign: string;
}

export const useBaseStore = defineStore(Names.Base, {
	state: () => {
		return {
			user_info: <UserInfo>{},
		};
	},
	actions: {
		setUserInfo(info: UserInfo) {
			this.user_info = info;
		},
	},
});
