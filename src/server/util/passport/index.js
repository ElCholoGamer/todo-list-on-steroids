const passport = require('passport');

const registerStrategy = require('./register-strategy');
const loginStrategy = require('./login-strategy');
const User = require('../../models/user');

function initPassport() {
	// Serialize session data
	passport.serializeUser((user, done) => done(null, user._id));

	// De-serialize session data
	passport.deserializeUser(async (id, done) => {
		const user = await User.findById(id);
		done(null, user);
	});

	// Authentication strategies
	passport.use('local-register', registerStrategy);
	passport.use('local-login', loginStrategy);
}

module.exports = initPassport;
