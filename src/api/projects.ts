import myAxios from './axios';

export interface EditProjectInfo {
	project_id: number;
	project_current_type?: number;
	project_desc?: string;
	project_img?: string;
	project_name?: string;
}

export interface ProjectGlobalInfo {
	project_id: number;
	env_list?: EnvList[];
	global_params?: GlobalParam[];
	global_variables?: GlobalVariable[];
}

export interface EnvList {
	env_type: number;
	env_baseurl: string;
}

export interface GlobalParam {
	type: number;
	params_list: ParamsList[];
}

export interface ParamsList {
	param_id?: number; // 如果有id，说明是已经存在的参数，否则是新增的参数
	param_desc: string;
	param_name: string;
	param_type: number;
	param_value: string;
	param_action_type: number; // 0-更新，1-插入，2-删除
}

export interface GlobalVariable {
	variable_id?: number; // 如果有id，说明是已经存在的参数，否则是新增的参数
	variable_desc: string;
	variable_name: string;
	variable_type: number;
	variable_value: string;
	variable_action_type: number; // 0-更新，1-插入，2-删除
}

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
export const addProject = (paramsList: { user_id: number; team_id: number; project_name: string; project_img: string; project_desc: string }) => {
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
export const updateDictionary = (paramsList: { dictionary_id: number; dictionary_name: string; father_id: number | null }) => {
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
