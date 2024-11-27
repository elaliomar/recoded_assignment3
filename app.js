const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// NOTE: Please don't make any changes to this array
const memes = [
  {
    name: "Money meme",
    imgSource:
      "https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png",
    genre: ["comedy", "dark", "witty"],
    id: "0",
  },
  {
    name: "Coding meme",
    imgSource:
      "https://pics.esmemes.com/my-code-doesnt-work-i-have-no-idea-why-my-21449922.png",
    genre: ["dark", "witty"],
    id: "1",
  },
  {
    name: "Javascript meme",
    imgSource:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvryRQ8Ot0OUHU1FEVbV2UHiCI5CQ3Hbm8cw&usqp=CAU",
    genre: ["comedy", "dark", "witty"],
    id: "2",
  },
];

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});

app.get("/memes", (req, res) => {
  return res.status(200).json(memes);
});

app.get("/meme/:userid", (req, res) => {
  const memeID = req.params.userid;
  const meme = memes.find((meme) => meme.id == memeID);
  if (!meme) {
    return res.status(422).send("meme not found");
  }
  return res.status(200).json(meme);
});

app.get("/memes/filter", (req, res) => {
  const filteredMems = memes.filter((meme) =>
    meme.genre.includes(req.query.genre)
  );
  if (filteredMems) {
    return res.status(200).json(filteredMems);
  }
  return res.status(400).send("invalid query parameter");
});

app.post("/memes", (req, res) => {
  if (!req.body.name || !req.body.imgSource || !req.body.genre) {
    return res.status(400).send("cannot create meme due to missing details");
  } else {
    const newId = parseInt(memes[memes.length - 1].id) + 1;
    const newMeme = Object.assign({ id: newId.toString() }, req.body);
    memes.push(newMeme);
    return res.status(201).json(newMeme);
  }
});

app.put("/meme/:userId", (req, res) => {
  const userId = req.params.userId;
  const meme = memes.find((meme) => meme.id == userId);
  if (meme) {
    const { genre, name, imgSource } = req.body;
    if (genre) meme.genre = genre;
    if (name) meme.name = name;
    if (imgSource) meme.imgSource = imgSource;
    return res.status(200).json(meme);
  }
  return res.status(422).json({ error: "meme not found" });
});

app.delete("/meme/:userId", (req, res) => {
  const userId = req.params.userId;
  const meme = memes.find((meme) => meme.id == userId);
  if (meme) {
    const index = memes.indexOf(meme);
    memes.splice(index, 1);
    return res.status(200).json(memes);
  }
  return res.status(422).write("meme not found");
});

module.exports = app;
