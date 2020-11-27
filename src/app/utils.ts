export const stringify = (obj: any) =>
	Object.keys(obj)
		.map(key => `${key}=${obj[key]}`)
		.join('&');

// Will probably add more to this in the future
export interface User {
	_id: string;
	username: string;
}
