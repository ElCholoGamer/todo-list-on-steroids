import express from 'express';
import multer from 'multer';
import asyncHandler from '../middleware/async-handler';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
import Avatar from '../models/avatar';
import User from '../models/user';
import todoRouter from './todo';

const router = express.Router();

router.use(checkAuth()); // Authentication-checking middleware
router.use('/todo', todoRouter); // Sub-router for Todo Lists

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

		await req.user?.save();
		res.json({
			status: 200,
			user: req.user,
		});
	})
);

// Upload user avatar
const upload = multer();
router.put(
	'/avatar',
	upload.single('image'),
	asyncHandler(async (req, res) => {
		const { file } = req;

		// Check that file exists
		if (!file) {
			return res.status(400).json({
				status: 400,
				message: 'Missing property "image" in request body',
			});
		}

		// Check file mimetype
		const { buffer, mimetype } = file;
		if (!mimetype.startsWith('image')) {
			return res.status(400).json({
				status: 400,
				message: 'Property "image" must have a mimetype starting with "image"',
			});
		}

		// Get current avatar
		const picture =
			(await req.user!.getAvatar()) || new Avatar({ _id: req.user!._id });

		// Assign new values and save
		picture.data = buffer;
		picture.contentType = mimetype;
		await picture.save();

		// Enable avatar in user
		if (!req.user!.avatar) {
			req.user!.avatar = true;
			await req.user!.save();
		}

		res.json({
			status: 200,
			picture,
		});
	})
);

// Get profile picture
router.get(
	'/avatar',
	asyncHandler(async (req, res) => {
		const picture = await req.user!.getAvatar();
		res.json({
			status: 200,
			picture,
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
