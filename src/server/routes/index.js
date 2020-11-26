const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
	'/register',
	passport.authenticate('local-register'),
	(req, res) => {
		console.log('User registered:', req.user);
		res.json(req.user);
	}
);

router.post('/login', passport.authenticate('local-login'), (req, res) => {
	console.log('User logged in:', req.user);
	res.json(req.user);
});

router.post('/logout', (req, res) => {
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

module.exports = router;
