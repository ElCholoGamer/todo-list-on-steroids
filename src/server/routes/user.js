const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth()); // Authentication-checking middleware

// Send user info
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
