import passport from 'passport';
import User, { IUser } from '../../models/user';
import loginStrategy from './login-strategy';
import registerStrategy from './register-strategy';

function initPassport() {
	// Serialize session data
	passport.serializeUser((user: IUser, done) => done(null, user._id));

	// De-serialize session data
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then(user => done(null, user))
			.catch(done);
	});

	// Authentication strategies
	passport.use('local-register', registerStrategy);
	passport.use('local-login', loginStrategy);
}

export default initPassport;
