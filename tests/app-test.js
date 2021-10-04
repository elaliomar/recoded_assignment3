let request = require('supertest');
request = request("http://localhost:3001");

const expect = require("chai").expect;

describe('GET /memes', () => {
    it('respond with array of memes',(done) => {
      request
        .get('/memes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (err,res) => {
            expect(res.body).to.be.an("array");
            done();
        });
    });
  });

describe("POST /memes", () => {
  it("respond with 201 created",(done) => {
    const meme = {
      name: "A new post",
      imgSource: "Lorem ipsum lorem ipsum",
      genre: ["blog", "lifestyle"],
      id:"4"
    };

    request
      .post("/memes")
      .set("Content-Type", "application/json")
      .send(meme)
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.be.a("string");
        expect(res.body.imgSource).to.be.a("string");
        expect(res.body.genre).to.be.a("array");
        done();
      });
  });

  it('respond with 400 not created when id is not passed',(done) => {
    const meme = {
      name: "A new post",
      imgSource: "Lorem ipsum lorem ipsum",
      genre: ["blog", "lifestyle"],
    };

    request
        .post('/memes')
        .send(meme)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect('"meme not created"')
        .end((err) => {
            if (err) return done(err);
            done();
        });
});


});

describe("GET /memes/:id", () => {
  const expectedOutput = {
    name:"halit",
    imgSource:"https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png",
    genre:["comedy","dark","witty"],
    id:"0"
  };

  it("respond with json containing a single meme",(done) => {
    request
      .get("/memes/0")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done)
    });

    it("respond with json meme not found",(done) => {
      request
          .get("/memes/idisnonexisting")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(422) //expecting HTTP status code
          .expect('"meme not found"') // expecting content value
          .end((err) => {
              if (err) return done(err);
              done();
          });
      });
  });

  describe("PUT /memes/:id", () => {
    it("update meme name using id",(done) => {
      const newMeme = {
        name: "New name",
        imgSource:"https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png",
        genre:["comedy","dark","witty"],
        id:"0"
      };

      request
      .put("/memes/0")
      .expect("Content-Type", /json/)
      .send(newMeme)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.be.a("string");
        expect(res.body.name).to.equal("New name");
        done();
      });
    });
  });
    
