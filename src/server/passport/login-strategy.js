const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

const loginStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		// Check if user exists
		const user = await User.findOne({ username });
		if (!user)
			return done(null, false, { status: 404, message: 'User not found' });

		// Check if password is correct
		if (!user.comparePassword(password))
			return done(null, false, { status: 401, message: 'Incorrect password' });

		done(null, user); // Return authenticated user
	}
);

module.exports = loginStrategy;
