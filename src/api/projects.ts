import myAxios from './axios';

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
