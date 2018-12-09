const express = require('express');

var app = express();

app.get('/', (req, res)=> {
	// res.send('<h1>Hello Express!</h1>');
	res.send({
		name: 'Karol',
		likes: [
			'biking',
			'hiking'
		]
	})
});

app.get('/about', (req, res) => {
	res.send('About page');
});

app.get('/podstrona', (req, res)=> {
	res.send('<h1>Podstrona!</h1>');
});

app.listen(3000);