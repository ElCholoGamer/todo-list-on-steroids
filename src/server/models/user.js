const { Schema, model } = require('mongoose');
const { compareSync, hashSync } = require('bcrypt');

require('dotenv').config();

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true },
	password: { type: String, required: true },
});

UserSchema.methods.encryptPassword = function (rounds = 10) {
	this.password = hashSync(this.password, rounds);
	return this;
};

UserSchema.methods.comparePassword = function (password) {
	return compareSync(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
