import request from '@/service';
import { ApiListItem, DictionaryId, ProjectId } from '../types';
import {
	AddDictionaryReq,
	CreateProjectReq,
	HistoryItem,
	ImportSwaggerReq,
	ImportSwaggerRes,
	ProjectBasicInfo,
	ProjectGlobalInfo,
	RecentProjectItem,
	RollbackReq,
	UpdateDictionaryReq,
	UpdateProjectGlobalInfoReq,
	UpdateProjectInfoReq,
	UploadProjectIconReq,
} from './types';

//获取最近访问的项目
export const recentlyVisited = () => {
	return request<undefined, RecentProjectItem[]>({
		url: '/projects/recentlyvisited',
		method: 'GET',
	});
};

//添加最近访问记录
export const addRecentProject = (data: ProjectId) => {
	return request<ProjectId, undefined>({
		url: '/projects/addrecentproject',
		method: 'POST',
		data,
	});
};

//新建项目
export const addProject = (data: CreateProjectReq) => {
	return request<CreateProjectReq, undefined>({
		url: '/projects/addproject',
		method: 'POST',
		data,
	});
};

// 获取某个项目的API接口列表
export const getProjectApiList = (params: ProjectId) => {
	return request<ProjectId, ApiListItem[]>({
		url: '/projects/apilist',
		method: 'GET',
		params,
	});
};

// 新增目录
export const addDictionary = (data: AddDictionaryReq) => {
	return request<AddDictionaryReq, number>({
		url: '/projects/adddictionary',
		method: 'POST',
		data,
	});
};

// 更新目录
export const updateDictionary = (data: UpdateDictionaryReq) => {
	return request<UpdateDictionaryReq, undefined>({
		url: '/projects/updatedictionary',
		method: 'POST',
		data,
	});
};

// 删除目录
export const deleteDictionary = (data: DictionaryId) => {
	return request<DictionaryId, undefined>({
		url: '/projects/deletedictionary',
		method: 'POST',
		data,
	});
};

// 获取项目全局信息
export const getProjectGlobalInfo = (params: ProjectId) => {
	return request<ProjectId, ProjectGlobalInfo>({
		url: '/projects/globalinfo',
		method: 'GET',
		params,
	});
};

// 获取项目基本信息
export const getProjectBasicInfo = (params: ProjectId) => {
	return request<ProjectId, ProjectBasicInfo>({
		url: '/projects/basicinfo',
		method: 'GET',
		params,
	});
};

// 修改项目基本信息
export const updateProjectBasicInfo = (data: UpdateProjectInfoReq) => {
	return request<UpdateProjectInfoReq, undefined>({
		url: '/projects/updatebasicinfo',
		method: 'POST',
		data,
	});
};

// 更新某项目的全局信息
export const updateProjectGlobalInfo = (paramsList: UpdateProjectGlobalInfoReq) => {
	return request<UpdateProjectGlobalInfoReq, number>({
		url: '/projects/updateglobalinfo',
		method: 'POST',
		data: paramsList,
	});
};

// 上传项目图标图片
export const uploadProjectIcon = (data: UploadProjectIconReq) => {
	return request<UploadProjectIconReq, string>({
		url: '/projects/uploadprojecticon',
		method: 'POST',
		data,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

// 删除项目
export const deleteProject = (data: ProjectId) => {
	return request<ProjectId, undefined>({
		url: '/projects/deleteproject',
		method: 'POST',
		data,
	});
};

// mock
export const mock = (data: string) => {
	return request<string>({
		url: '/projects/mock',
		method: 'POST',
		data,
	});
};

// 导入Swagger文档
export const importSwagger = (data: ImportSwaggerReq) => {
	return request<ImportSwaggerReq, ImportSwaggerRes>({
		url: '/projects/importswagger',
		method: 'POST',
		data,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

// 获取历史记录信息
export const getHistoryInfo = (params: ProjectId) => {
	return request<ProjectId, HistoryItem[]>({
		url: '/projects/history',
		method: 'GET',
		params,
	});
};

// 版本回滚
export const rollback = (data: RollbackReq) => {
	return request<RollbackReq, undefined>({
		url: '/projects/rollback',
		method: 'POST',
		data,
	});
};
