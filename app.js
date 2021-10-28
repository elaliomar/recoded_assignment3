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

module.exports = app;
