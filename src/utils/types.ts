// 用户个人信息
export interface UserInfo {
	user_id: number;
	user_name: string;
	user_img: string;
	user_email: string;
	user_phone: string;
	user_sign: string;
}

export interface LastVisitedListItem {
	projectName: string;
	lastVisitedTime: string;
}
