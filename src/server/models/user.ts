import { compareSync, hashSync } from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import Picture, { IPicture } from './picture';
import TodoList, { ITodoList } from './todo-list';

export interface IUser extends Document {
	username: string;
	password: string;
	bio?: string;
	getTodoList(): Promise<ITodoList>;
	encryptPassword(): void;
	comparePassword(password: string): boolean;
	getPicture(): Promise<IPicture> | undefined;
}

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true },
	password: { type: String, required: true },
	bio: { type: String, required: true, default: '', trim: true },
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

UserSchema.methods.getPicture = async function () {
	return await Picture.findById(this._id);
};

const User = model<IUser>('User', UserSchema);

export default User;
