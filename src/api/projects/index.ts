import myAxios from '../axios';
import { EditProjectInfo, ProjectGlobalInfo } from './types';

//获取最近访问的项目
export const recentlyVisited = (paramsList: { user_id: number }) => {
	return myAxios({
		url: '/projects/recentlyvisited',
		method: 'GET',
		params: paramsList,
	});
};

//添加最近访问记录
export const addRecentProject = (paramsList: { user_id: number; project_id: number }) => {
	return myAxios({
		url: '/projects/addrecentproject',
		method: 'POST',
		data: paramsList,
	});
};

//新建项目
export const addProject = (paramsList: { user_id: number; team_id: number; project_name: string; project_img: string; project_desc?: string }) => {
	return myAxios({
		url: '/projects/addproject',
		method: 'POST',
		data: paramsList,
	});
};

// 获取某个项目的API接口列表
export const getProjectApiList = (paramsList: { project_id: number }) => {
	return myAxios({
		url: '/projects/apilist',
		method: 'GET',
		params: paramsList,
	});
};

// 新增目录
export const addDictionary = (paramsList: { project_id: number; father_id: number; dictionary_name: string }) => {
	return myAxios({
		url: '/projects/adddictionary',
		method: 'POST',
		data: paramsList,
	});
};

// 更新目录
export const updateDictionary = (paramsList: { dictionary_id: number; dictionary_name?: string; father_id: number | null }) => {
	return myAxios({
		url: '/projects/updatedictionary',
		method: 'POST',
		data: paramsList,
	});
};

// 删除目录
export const deleteDictionary = (paramsList: { dictionary_id: number }) => {
	return myAxios({
		url: '/projects/deletedictionary',
		method: 'POST',
		data: paramsList,
	});
};

// 获取项目全局信息
export const getProjectGlobalInfo = (paramsList: { project_id: number }) => {
	return myAxios({
		url: '/projects/globalinfo',
		method: 'GET',
		params: paramsList,
	});
};

// 获取项目基本信息
export const getProjectBasicInfo = (paramsList: { project_id: number }) => {
	return myAxios({
		url: '/projects/basicinfo',
		method: 'GET',
		params: paramsList,
	});
};

// 修改项目基本信息
export const updateProjectBasicInfo = (paramsList: EditProjectInfo) => {
	return myAxios({
		url: '/projects/updatebasicinfo',
		method: 'POST',
		data: paramsList,
	});
};

// 更新某项目的全局信息
export const updateProjectGlobalInfo = (paramsList: ProjectGlobalInfo) => {
	return myAxios({
		url: '/projects/updateglobalinfo',
		method: 'POST',
		data: paramsList,
	});
};

// 上传项目图标图片
export const uploadProjectIcon = (paramsList: { projectIcon: File }) => {
	return myAxios({
		url: '/projects/uploadprojecticon',
		method: 'POST',
		data: paramsList,
		headers: {
			Authorization: localStorage.getItem('token') ?? '',
			'Content-Type': 'multipart/form-data',
		},
	});
};

// 删除项目
export const deleteProject = (paramsList: { project_id: number }) => {
	return myAxios({
		url: '/projects/deleteproject',
		method: 'POST',
		data: paramsList,
	});
};

// mock
export const mock = (paramsList: JSON) => {
	return myAxios({
		url: '/projects/mock',
		method: 'POST',
		data: paramsList,
	});
};

// 导入Swagger文档
export const importSwagger = (paramsList: { yamlFile: File; project_id: number }) => {
	return myAxios({
		url: '/projects/importswagger',
		method: 'POST',
		data: paramsList,
		headers: {
			Authorization: localStorage.getItem('token') ?? '',
			'Content-Type': 'multipart/form-data',
		},
	});
};

// 获取历史记录信息
export const getHistoryInfo = (paramsList: { project_id: number }) => {
	return myAxios({
		url: '/projects/history',
		method: 'GET',
		params: paramsList,
	});
};

// 版本回滚
export const rollback = (data: { version_id: number; project_id: number }) => {
	return myAxios({
		url: '/projects/rollback',
		method: 'POST',
		data,
	});
};
