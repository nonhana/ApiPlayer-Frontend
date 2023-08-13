// 用户个人信息
export interface UserInfo {
	user_id: number;
	user_name: string;
	user_img: string;
	user_email: string;
	user_phone: string;
	user_sign: string;
}

export interface RecentlyVisitedListItem {
	project_id: number;
	project_name: string;
	project_img: string;
	project_visited_date: string;
}

