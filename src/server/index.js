const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const { resolve, join } = require('path');

const initPassport = require('./passport');
const initDatabase = require('./database');
const indexRouter = require('./routes');

// Initialization
const app = express();
initPassport();

// Middleware
app.use(cors()); // Allow access from cross-origin requests

// Express session (Needed for passport)
app.use(
	session({
		secret: 'big-chungus',
		resave: false,
		saveUninitialized: false,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false })); // Body parser for urlencoded requests
app.use(morgan('common')); // Request logger

// Routes
app.use('/', indexRouter);

// Static files and React app
if (!process.argv.includes('--dev')) {
	const BUILD = resolve(__dirname, '../../build');

	app.use(express.static(BUILD));
	app.get('*', (req, res) => res.sendFile(join(BUILD, 'index.html')));
} else {
	console.log('Running in development mode');
}

// Database connection
initDatabase()
	.then(() => {
		console.log('Database connected');

		const { PORT = 8080 } = process.env;
		app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
	})
	.catch(console.error);
