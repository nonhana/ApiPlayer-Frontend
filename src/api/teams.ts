import myAxios from './axios';

// 获取团队列表
export const teamList = (paramsList: { user_id: number }) => {
	return myAxios({
		url: '/teams/teamlist',
		method: 'GET',
		params: paramsList,
	});
};

//新建团队
export const addTeam = (paramsList: { user_id: number; team_name: string; team_desc: string; team_user_name: string; project_img: string }) => {
	return myAxios({
		url: '/teams/addteam',
		method: 'POST',
		data: paramsList,
	});
};

//删除团队
export const deleteTeam = (paramsList: { team_id: number }) => {
	return myAxios({
		url: '/teams/deleteteam',
		method: 'POST',
		data: paramsList,
	});
};

//获取团队详情信息
export const teamInfo = (paramsList: { team_id: number; user_id: number }) => {
	return myAxios({
		url: '/teams/teaminfo',
		method: 'GET',
		params: paramsList,
	});
};

//更新团队信息
export const updateTeam = (paramsList: { team_id: number; user_id: number; team_name: string; team_desc: string; team_user_name: string }) => {
	return myAxios({
		url: '/teams/updateteam',
		method: 'POST',
		data: paramsList,
	});
};

//邀请用户加入团队
export const inviteUser = (paramsList: { team_id: number; user_id: number; team_user_name: string }) => {
	return myAxios({
		url: '/teams/inviteuser',
		method: 'POST',
		data: paramsList,
	});
};

//设置成员权限
export const setMemberIdentity = (paramsList: {
	team_id: number;
	user_id: number;
	team_user_identity: number;
	team_user_name: string;
	team_project_indentity_list: {
		project_id: string;
		project_user_identity: number;
	}[];
}) => {
	return myAxios({
		url: '/teams/setmemberidentity',
		method: 'POST',
		data: paramsList,
	});
};

//移除成员
export const removeMember = (paramsList: { team_id: number; user_id: number }) => {
	return myAxios({
		url: '/teams/removemember',
		method: 'POST',
		data: paramsList,
	});
};
