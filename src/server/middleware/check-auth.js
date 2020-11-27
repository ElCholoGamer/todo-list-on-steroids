const defaultOptions = {
	allowValue: true,
	responseStatus: 401,
	notAuthMessage: 'User is not authenticated',
	authMessage: 'User is already authenticated',
};

// Middleware that checks whether a user is authenticated or not
function checkAuth(options = defaultOptions) {
	const { allowValue, responseStatus, notAuthMessage, authMessage } = {
		...defaultOptions,
		...options,
	};

	return (req, res, next) => {
		if (req.isAuthenticated() !== allowValue) {
			res.status(responseStatus).json({
				status: responseStatus,
				message: allowValue ? notAuthMessage : authMessage,
			});
		} else {
			next();
		}
	};
}

module.exports = checkAuth;
