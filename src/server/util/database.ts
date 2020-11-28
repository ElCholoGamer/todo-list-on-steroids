import mongoose from 'mongoose';

const initDatabase = () =>
	mongoose.connect(process.env.ATLAS_URI || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

export default initDatabase;
