const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const registerStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		// Check if user with username already exists
		if (await User.findOne({ username }))
			return done(null, false, { message: 'Username already exists' });

		// Create user
		const user = new User({
			username,
			password,
		});

		await user.save(); // Save user to database
		done(null, user); // Return authenticated user
	}
);

module.exports = registerStrategy;
