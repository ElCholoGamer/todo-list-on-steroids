const { Schema, model } = require('mongoose');
const { hashSync, compareSync } = require('bcrypt');

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true },
	password: { type: String, required: true },
	token: String,
});

UserSchema.pre('save', function (next) {
	this.password = hashSync(this.password, 10);
	next();
});

UserSchema.methods.comparePassword = function (password) {
	return compareSync(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
