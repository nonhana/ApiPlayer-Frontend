export function validateEmail(email: string) {
	const re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	return re.test(email);
}
