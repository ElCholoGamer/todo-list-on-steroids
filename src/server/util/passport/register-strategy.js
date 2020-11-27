const LocalStrategy = require('passport-local').Strategy;
const { hashSync } = require('bcrypt');

const User = require('../../models/user');

const registerStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		username = username.trim(); // Trim username just in case

		// Check if user with username already exists
		if (await User.findOne({ username }))
			return done(null, false, { message: 'Username already exists' });

		// Create user document
		const user = new User({
			username,
			password,
			todo: [],
		});

		user.encryptPassword(); // Hash password for storing in database
		await user.save(); // Save user to database

		done(null, user); // Return authenticated user
	}
);

module.exports = registerStrategy;
