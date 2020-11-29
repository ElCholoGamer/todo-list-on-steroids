import express from 'express';
import asyncHandler from '../../middleware/async-handler';
import checkAuth from '../../middleware/check-auth';
import validator from '../../middleware/validator';
import User from '../../models/user';
import avatarRouter from './avatar';
import todoRouter from './todo';

const router = express.Router();

router.use(checkAuth()); // Authentication-checking middleware
router.use('/todo', todoRouter); // Sub-router for Todo Lists
router.use('/avatar', avatarRouter);

// Send user info
router.get('/', (req, res) => res.json({ status: 200, user: req.user }));

// Get update user
router.put(
	'/',
	validator({
		username: { type: 'string', minLength: 1 },
		bio: { type: 'string', required: false },
	}),
	asyncHandler(async (req, res) => {
		const { username, bio } = req.body;

		const existing = await User.findOne({ username });
		if (existing && existing?._id.toString() !== req.user!._id.toString()) {
			return res.status(409).json({
				status: 409,
				message: 'Username already exists',
			});
		}

		req.user!.bio = bio;
		req.user!.username = username;

		await req.user!.save();
		res.json({
			status: 200,
			user: req.user,
		});
	})
);

// Log out user session
router.post('/logout', (req, res) => {
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

export default router;
