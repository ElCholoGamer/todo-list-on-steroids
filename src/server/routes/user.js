const express = require('express');

const router = express.Router();

// Authentication-checking middleware
router.use((req, res, next) => {
	if (!req.isAuthenticated()) {
		res.status(401).json({
			status: 401,
			message: 'User is not logged in',
		});
	} else {
		next();
	}
});

router.get('/', (req, res) => res.json({ status: 200, user: req.user }));

router.post('/logout', (req, res) => {
	// Log out user session
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

module.exports = router;
