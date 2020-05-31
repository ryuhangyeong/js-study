const express = require('express');
const app = express();
const { translateSchema } = require('./validation');
const { getTranlateResult } = require('./api');
const { readFile } = require('./promise');
const { PORT, ADDRESS } = process.env;

app.use(express.static('public'));

app.get('/translate', async (req, res) => {
	const validError = translateSchema().validate(req.query);

	if ( validError.length ) return res.status(400).json({ 'error': validError[0].message });

	try {
		const data = await getTranlateResult(req.query);

		res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
		res.end(data);
	} catch(e) {
		console.log(e);
	}
});

app.get('/', async (req, res) => {
	try {
		const data = await readFile('./public/index.html');

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
	} catch(e) {
		console.log(e);
	}
});

app.get('/test', async (req, res) => {
	try {
		const data = await readFile('./public/test.html');
		
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
	} catch(e) {
		console.log(e);
	}
});

app.listen(PORT, () => { console.log(`${ADDRESS} app listening on port ${PORT}!`); });