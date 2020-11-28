import express from 'express';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
import todoRouter from './todo';

const router = express.Router();

router.use(checkAuth()); // Authentication-checking middleware
router.use('/todo', todoRouter); // Sub-router for Todo Lists

// Send user info
router.get('/', (req, res) => res.json({ status: 200, user: req.user }));

router.put('/bio', validator({ bio: 'string' }), async (req, res) => {
	req.user!.bio = req.body.bio;
	await req.user?.save();

	res.json({
		status: 200,
		user: req.user,
	});
});

router.post('/logout', (req, res) => {
	// Log out user session
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

export default router;
