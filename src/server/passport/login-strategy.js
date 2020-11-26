const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

const loginStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		console.log('Login strategy');
		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) return done(null, false, { message: "Username doesn't exist" });

		// Check if password is correct
		if (!user.comparePassword(password))
			return done(null, false, { message: 'Invalid password' });

		console.log('Everything alright');
		done(null, user); // Return authenticated user
	}
);

module.exports = loginStrategy;
