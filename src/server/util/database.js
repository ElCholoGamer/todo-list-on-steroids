const mongoose = require('mongoose');

const initDatabase = () =>
	mongoose.connect(process.env.ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

module.exports = initDatabase;
