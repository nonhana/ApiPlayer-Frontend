import request from '@/service';
import { TeamId, UserIdReq } from '../types';
import { CreateTeamReq, DetailTeamInfo, InviteUserReq, RemoveMemberReq, SetMemberIdentityReq, TeamItem, UpdateTeamInfoReq } from './types';

// 获取团队列表
export const teamList = (params: UserIdReq) => {
	return request<UserIdReq, TeamItem[]>({
		url: '/teams/teamlist',
		method: 'GET',
		params,
	});
};

//新建团队
export const addTeam = (data: CreateTeamReq) => {
	return request<CreateTeamReq, undefined>({
		url: '/teams/addteam',
		method: 'POST',
		data,
	});
};

//删除团队
export const deleteTeam = (data: TeamId) => {
	return request<TeamId, undefined>({
		url: '/teams/deleteteam',
		method: 'POST',
		data,
	});
};

//获取团队详情信息
export const teamInfo = (params: TeamId) => {
	return request<TeamId, DetailTeamInfo>({
		url: '/teams/teaminfo',
		method: 'GET',
		params,
	});
};

//更新团队信息
export const updateTeam = (data: UpdateTeamInfoReq) => {
	return request<UpdateTeamInfoReq, undefined>({
		url: '/teams/updateteam',
		method: 'POST',
		data,
	});
};

//邀请用户加入团队
export const inviteUser = (data: InviteUserReq) => {
	return request<InviteUserReq, undefined>({
		url: '/teams/inviteuser',
		method: 'POST',
		data,
	});
};

//设置成员权限
export const setMemberIdentity = (data: SetMemberIdentityReq) => {
	return request<SetMemberIdentityReq, undefined>({
		url: '/teams/setmemberidentity',
		method: 'POST',
		data,
	});
};

//移除成员
export const removeMember = (data: RemoveMemberReq) => {
	return request<RemoveMemberReq, undefined>({
		url: '/teams/removemember',
		method: 'POST',
		data,
	});
};
