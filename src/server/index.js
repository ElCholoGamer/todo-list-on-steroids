const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { resolve, join } = require('path');

const app = express();

app.use(cors());
app.use(morgan('common'));

if (!process.argv.includes('--dev')) {
	const BUILD = resolve(__dirname, '../../build');

	app.use(express.static(BUILD));
	app.get('*', (req, res) => res.sendFile(join(BUILD, 'index.html')));
} else {
	console.log('Running in development mode');
}

const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
