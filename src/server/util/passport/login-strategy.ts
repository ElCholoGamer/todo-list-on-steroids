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
		if (!user) return done(null, false, { message: 'User not found-404' });

		// Check if password is correct
		if (!user.comparePassword(password))
			return done(null, false, { message: 'Incorrect password-401' });

		done(null, user); // Return authenticated user
	}
);

export default loginStrategy;
