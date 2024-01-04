import myAxios from '../axios';
import { ApiAddInfo, DeleteInfo, Execute } from './types';

// 获取api数据
export const getApiInfo = (params: { api_id: number }) => {
	return myAxios({
		url: '/apis/apiinfo',
		method: 'GET',
		params,
	});
};

// 新建Api
export const addApi = (data: ApiAddInfo) => {
	return myAxios({
		url: '/apis/addapi',
		method: 'POST',
		data,
	});
};

// 更新接口
export const updateApi = (data: any) => {
	return myAxios({
		url: '/apis/updateapi',
		method: 'POST',
		data,
	});
};

// 删除api
export const deleteApi = (data: DeleteInfo) => {
	return myAxios({
		url: '/apis/deleteapi',
		method: 'POST',
		data,
	});
};

// 运行api
export const executeApi = (data: Execute) => {
	return myAxios({
		url: '/apis/runapi',
		method: 'POST',
		data,
	});
};
