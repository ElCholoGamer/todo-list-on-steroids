import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';

const loginStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) return done(null, false, { message: '404-User not found' });

		// Check if password is correct
		if (!user.comparePassword(password))
			return done(null, false, { message: '401-Incorrect password' });

		done(null, user); // Return authenticated user
	}
);

export default loginStrategy;
