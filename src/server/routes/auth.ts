import express from 'express';
import passport from 'passport';
import checkAuth from '../middleware/check-auth';

const router = express.Router();

router.use(checkAuth({ allowValue: false }));

router.post('/register', passport.authenticate('local-register'), (req, res) =>
	res.json({ status: 200, user: req.user })
);

// Login route
router.post('/login', (req, res, next) => {
	req.logout();
	passport.authenticate('local-login', (err, user, info) => {
		if (err) {
			next(err);
		} else if (info && !user) {
			const [status, message] = info.message?.split('-') || [
				500,
				'Unkown error',
			];
			res.status(status).json({ status, message });
		} else {
			// Log in user to session
			req.login(user, err => {
				if (err) {
					console.error(err);
					res.status(500).json({ status: 500, message: 'Unknown error' });
				} else {
					res.json({ status: 200, user }); // Send response with user
				}
			});
		}
	})(req, res, next);
});

export default router;
