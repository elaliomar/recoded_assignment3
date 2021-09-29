const express = require("express");
const app = express();
const port = 3001;

const path = require("path");
const bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [{
    name:"halit",
    password:"omg"
}];

app.get("/users",(req, res, next) => {
    res.send(users)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


