const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
	'/register',
	passport.authenticate('local-register'),
	(req, res) => {
		console.log('User registered:', req.user);
		res.json({ status: 200, user: req.user });
	}
);

router.post('/login', (req, res, next) => {
	console.log('User logging in...');
	passport.authenticate('local-login', (err, user, info) => {
		if (err) {
			next(err);
		} else if (info && !user) {
			res.status(info.status || 401).json(info);
		} else {
			// Log in user to session
			req.login(user, err => {
				if (err) {
					res.status(500).json({ status: 500, message: 'Unknown error' });
				} else {
					res.json({ status: 200, user }); // Send response with user
				}
			});
		}
	})(req, res, next);
});

module.exports = router;
