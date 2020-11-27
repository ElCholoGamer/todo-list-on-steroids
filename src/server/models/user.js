const { Schema, model } = require('mongoose');
const { compareSync, hashSync } = require('bcrypt');
const TodoList = require('./todo-list');

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true },
	password: { type: String, required: true },
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

const User = model('User', UserSchema);

module.exports = User;
