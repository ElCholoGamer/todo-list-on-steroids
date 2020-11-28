import { RequestHandler } from 'express';

interface Options {
	allowValue?: boolean;
	failStatus?: number;
	notAuthMessage?: string;
	authMessage?: string;
}

// Middleware that checks whether a user is authenticated or not
function checkAuth(options: Options = {}): RequestHandler {
	const {
		allowValue = true,
		failStatus = 401,
		notAuthMessage = 'User is not authenticated',
		authMessage = 'User is already authenticated',
	} = options;

	return (req, res, next) => {
		if (req.isAuthenticated() !== allowValue) {
			res.status(failStatus).json({
				status: failStatus,
				message: allowValue ? notAuthMessage : authMessage,
			});
		} else {
			next();
		}
	};
}

export default checkAuth;
