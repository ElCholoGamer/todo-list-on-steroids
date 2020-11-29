import { compareSync, hashSync } from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import Avatar, { IAvatar } from './avatar';
import TodoList, { ITodoList } from './todo-list';

export interface IUser extends Document {
	username: string;
	password: string;
	bio?: string;
	avatar: boolean;
	getTodoList(): Promise<ITodoList>;
	encryptPassword(): void;
	comparePassword(password: string): boolean;
	getAvatar(): Promise<IAvatar> | undefined;
}

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true },
	password: { type: String, required: true },
	bio: { type: String, trim: true },
	avatar: { type: Boolean, required: true, default: false },
});

UserSchema.methods.getTodoList = async function () {
	return (await TodoList.findById(this._id)) || new TodoList({ _id: this._id });
};

UserSchema.methods.encryptPassword = function (rounds = 10) {
	this.password = hashSync(this.password, rounds);
	return this;
};

UserSchema.methods.comparePassword = function (password = '') {
	return compareSync(password, this.password);
};

UserSchema.methods.getAvatar = async function () {
	return await Avatar.findById(this._id);
};

const User = model<IUser>('User', UserSchema);

export default User;
