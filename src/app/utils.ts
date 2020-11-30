export interface User {
	_id: string;
	username: string;
	bio: string;
}

export interface ITodoItem {
	_id: string;
	content: string;
	done: boolean;
}
