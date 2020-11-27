export const stringify = (obj: any, encode = false) =>
	Object.keys(obj)
		.map(
			key =>
				`${encode ? encodeURIComponent(key) : key}=${
					encode ? encodeURIComponent(obj[key]) : obj[key]
				}`
		)
		.join('&');

// Will probably add more to this in the future
export interface User {
	_id: string;
	username: string;
}

export interface ITodoItem {
	_id: string;
	content: string;
	done: boolean;
}
