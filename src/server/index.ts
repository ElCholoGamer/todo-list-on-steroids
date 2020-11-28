import connectMongo from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { connection } from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import { join, resolve } from 'path';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import initDatabase from './util/database';
import initPassport from './util/passport';

dotenv.config();

// Initialization
const app = express();
const MongoStore = connectMongo(session);
initPassport();

// JSON replacer for password
app.set('json replacer', (key: string, val: any) =>
	key === 'password' ? undefined : val
);

// Middleware
app.use(cors()); // Allow access from cross-origin requests
app.use(express.json()); // Body parser for JSON requests
app.use(morgan('common')); // Request logger

// Express session (Needed for passport)
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: connection }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Static files and React app
if (!process.argv.includes('--dev')) {
	const BUILD = resolve(__dirname, '../build');
	app.use(express.static(BUILD));

	app.get('*', (req, res, next) => {
		const {
			method,
			headers: { accept = '' },
		} = req;

		if (method === 'GET' && accept.indexOf('text/html') !== -1) {
			res.sendFile(join(BUILD, 'index.html'));
		} else {
			next();
		}
	});
}

// Database connection
initDatabase()
	.then(() => {
		console.log('Database connected');

		const { PORT = 5000 } = process.env;
		app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
	})
	.catch(console.error);
