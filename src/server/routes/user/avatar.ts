import express from 'express';
import multer from 'multer';
import asyncHandler from '../../middleware/async-handler';
import Avatar from '../../models/avatar';

const router = express.Router();

// Get user avatar
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const picture = await req.user!.getAvatar();
		if (!picture) {
			res.status(404).json({
				status: 404,
				message: 'Avatar not available',
			});
		} else {
			const { contentType, data } = picture;
			res.contentType(contentType).send(data);
		}
	})
);

// Upload user avatar
const upload = multer();
router.put(
	'/',
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

		res.contentType(mimetype).send(buffer);
	})
);

// Remove user avatar
router.delete(
	'/',
	asyncHandler(async (req, res) => {
		if (!req.user!.avatar) {
			return res.status(404).json({
				status: 404,
				message: 'User avatar not available',
			});
		}

		await Avatar.findByIdAndDelete(req.user!._id);

		req.user!.avatar = false;
		await req.user!.save();

		res.json({
			status: 200,
			message: 'Avatar deleted successfully',
			user: req.user,
		});
	})
);

export default router;
