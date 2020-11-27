const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const { connection } = require('mongoose');
const connectMongo = require('connect-mongo');
const { resolve, join } = require('path');

require('dotenv').config();

const initPassport = require('./util/passport');
const initDatabase = require('./util/database');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// Initialization
const app = express();
const MongoStore = connectMongo(session);
initPassport();

// JSON replacer for password
app.set('json replacer', (key, val) => (key === 'password' ? undefined : val));

// Middleware
app.use(cors()); // Allow access from cross-origin requests
app.use(express.urlencoded({ extended: false })); // Body parser for urlencoded requests
app.use(express.json()); // Body parser for JSON requests
app.use(morgan('common')); // Request logger

// Express session (Needed for passport)
app.use(
	session({
		secret: process.env.SESSION_SECRET,
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
const BUILD = resolve(__dirname, '../../build');
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

// Database connection
initDatabase()
	.then(() => {
		console.log('Database connected');

		const { PORT = 5000 } = process.env;
		app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
	})
	.catch(console.error);
