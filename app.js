const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Post = require("./models/Post");

mongoose.connect("mongodb://127.0.0.1:27017/pcleant-test-db");

app.set("view engine", "ejs");

//MIDDLEWARS
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

const port = 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
