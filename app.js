const express = require('express');
const app = express();
const port = 3001;

const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const memes = [
	{
		name: 'halit',
		imgSource:
			'https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png',
		genre: [ 'comedy', 'dark', 'witty' ],
		id: '0'
	},
	{
		name: 'yusuf',
		imgSource:
			'https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png',
		genre: [ 'comedy', 'dark', 'witty' ],
		id: '1'
	},
	{
		name: 'John doe',
		imgSource:
			'https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png',
		genre: [ 'comedy', 'dark', 'witty' ],
		id: '2'
	}
];

app.get('/memes', (req, res, next) => {
	res.send(memes);
});

app.post('/memes', (req, res, next) => {
	const { name, imgSource, genre, id } = req.body;

	if (!id) {
		return res.status(400).json('meme not created');
	}
	const newMeme = { name, imgSource, genre, id };
	memes.push(newMeme);
	res.status(201).send(newMeme);
});

app.get('/memes/:id', (req, res, next) => {
	const meme = memes.find((el) => el.id === req.params.id);
	if (!meme) {
		res.status(422).json('meme not found');
	}
	res.status(200).send(meme);
});

app.put('/memes/:id', (req, res, next) => {
	const memeIndex = memes.findIndex((el) => el.id === req.params.id);
	memes[memeIndex] = req.body;

	if (memeIndex === -1) {
		res.status(422).json('meme not found');
	}

	res.status(200).send(memes[memeIndex]);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
