import express from 'express';
import checkAuth from '../middleware/check-auth';
import todoRouter from './todo';

const router = express.Router();

router.use(checkAuth()); // Authentication-checking middleware
router.use('/todo', todoRouter); // Sub-router for Todo Lists

// Send user info
router.get('/', (req, res) => res.json({ status: 200, user: req.user }));

router.put('/bio', async (req, res) => {
	const { bio } = req.body;

	const type = typeof bio;
	if (type !== 'string') {
		return res.status(400).json({
			status: 400,
			message: `Request property "bio" must be of type "string", received "${type}"`,
		});
	}

	req.user!.bio = bio;
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
