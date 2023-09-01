import { ElNotification } from 'element-plus';
import { AxiosResponse } from 'axios';

export const resExecutor = (res: AxiosResponse): boolean => {
	if (res.data.result_code === 1) {
		ElNotification({
			title: '错误',
			message: res.data.result_msg,
			type: 'error',
		});
		return false;
	} else {
		return true;
	}
};
