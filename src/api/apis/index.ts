import request from '@/service';
import { ApiId } from '../types';
import { AddApiReq, ApiDetailInfo, DeleteApiReq, RunApiReq, RunApiRes, UpdateApiReq } from './types';

// 获取api数据
export const getApiInfo = (params: ApiId) => {
	return request<ApiId, ApiDetailInfo>({
		url: '/apis/apiinfo',
		method: 'GET',
		params,
	});
};

// 新建Api
export const addApi = (data: AddApiReq) => {
	return request<AddApiReq, number>({
		url: '/apis/addapi',
		method: 'POST',
		data,
	});
};

// 更新接口
export const updateApi = (data: UpdateApiReq) => {
	return request<UpdateApiReq, number>({
		url: '/apis/updateapi',
		method: 'POST',
		data,
	});
};

// 删除api
export const deleteApi = (data: DeleteApiReq) => {
	return request<DeleteApiReq, undefined>({
		url: '/apis/deleteapi',
		method: 'POST',
		data,
	});
};

// 运行api
export const executeApi = (data: RunApiReq) => {
	return request<RunApiReq, RunApiRes>({
		url: '/apis/runapi',
		method: 'POST',
		data,
	});
};
