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
		genre: ['dark', 'witty' ],
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
		return res.status(400).json('meme not created please provide an id');
	}
	const newMeme = { name, imgSource, genre, id };
	memes.push(newMeme);
	res.status(201).send(newMeme);
});

app.delete('/memes/:id', (req,res) => {
	const memeIndex = memes.findIndex(el => el.id === req.params.id);
	console.log(req.params.id);
	if (memeIndex === -1) {
		res.status(422).json('meme not found');
	}
	
	const filteredMemes = memes.filter(meme => {
		return meme.id !== req.params.id
	});
	
	res.status(200).send(filteredMemes);
});

app.get('/memes/filter', (req,res) => {
	const { genre } = req.query;

	if(!genre) {
		res.status(400).json("please make sure you send a valid query parameter");
	}

	const filteredMemes = memes.filter(meme => {
		return meme.genre.includes(genre);
	})

	res.status(200).send(filteredMemes);
})

app.get('/memes/:id', (req, res, next) => {
	const meme = memes.find((el) => el.id === req.params.id);
	if (!meme) {
		res.status(422).json('meme not found');
	}
	res.status(200).send(meme);
});

app.put('/memes/:id', (req, res, next) => {
	const memeIndex = memes.findIndex((el) => el.id === req.params.id);
	
	if (memeIndex === -1) {
		res.status(422).json('meme not found');
	}
	memes[memeIndex] = req.body;
	res.status(200).send(memes[memeIndex]);
});



app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
