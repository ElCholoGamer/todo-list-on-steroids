const defaultOptions = {
	allowValue: true,
	status: 401,
	notAuthMessage: 'User is not authenticated',
	authMessage: 'User is already authenticated',
};

// Middleware that checks whether a user is authenticated or not
function checkAuth(options = defaultOptions) {
	const { allowValue, status, notAuthMessage, authMessage } = {
		...defaultOptions,
		...options,
	};

	return (req, res, next) => {
		if (req.isAuthenticated() !== allowValue) {
			res.status(status).json({
				status,
				message: allowValue ? notAuthMessage : authMessage,
			});
		} else {
			next();
		}
	};
}

module.exports = checkAuth;
