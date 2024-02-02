interface DateFormatOptions {
	year?: string;
	month?: string;
	day?: string;
	hour?: string;
	minute?: string;
	second?: string;
}

// 将 Date 对象格式化为指定格式的字符串
export const formatDate = (dateInput: Date | string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
	const date = new Date(dateInput);
	const formatOptions: DateFormatOptions = {
		year: date.getFullYear().toString(),
		month: (date.getMonth() + 1).toString().padStart(2, '0'),
		day: date.getDate().toString().padStart(2, '0'),
		hour: date.getHours().toString().padStart(2, '0'),
		minute: date.getMinutes().toString().padStart(2, '0'),
		second: date.getSeconds().toString().padStart(2, '0'),
	};

	let formattedDate = format;

	formattedDate = formattedDate.replace(/YYYY/g, formatOptions.year ?? '');
	formattedDate = formattedDate.replace(/MM/g, formatOptions.month ?? '');
	formattedDate = formattedDate.replace(/DD/g, formatOptions.day ?? '');
	formattedDate = formattedDate.replace(/HH/g, formatOptions.hour ?? '');
	formattedDate = formattedDate.replace(/mm/g, formatOptions.minute ?? '');
	formattedDate = formattedDate.replace(/ss/g, formatOptions.second ?? '');

	return formattedDate;
};

// 获取至今的时间
export const timeAgo = (dateTime: string) => {
	// dateTime格式：2023-08-23T19:03:47.000Z
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = day * 30;
	const now = new Date().getTime();

	const dateTimeStampNumber = new Date(dateTime).getTime();
	const diffValue = now - dateTimeStampNumber;

	if (diffValue < 0) {
		return '';
	}

	let result = '';
	const minC = diffValue / minute;
	const hourC = diffValue / hour;
	const dayC = diffValue / day;
	const weekC = diffValue / week;
	const monthC = diffValue / month;

	if (monthC >= 1 && monthC < 4) {
		result = ' ' + parseInt(monthC.toString()) + '月前';
	} else if (weekC >= 1 && weekC < 4) {
		result = ' ' + parseInt(weekC.toString()) + '周前';
	} else if (dayC >= 1 && dayC < 7) {
		result = ' ' + parseInt(dayC.toString()) + '天前';
	} else if (hourC >= 1 && hourC < 24) {
		result = ' ' + parseInt(hourC.toString()) + '小时前';
	} else if (minC >= 1 && minC < 60) {
		result = ' ' + parseInt(minC.toString()) + '分钟前';
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = '刚刚';
	} else {
		result = dateTime.split(' ')[0];
	}
	return result;
};
