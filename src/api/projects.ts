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
