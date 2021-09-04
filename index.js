const mongoose = require("mongoose");
const winston = require("winston");
const Joi = require("joi");
var fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("config");
const path = require("path");
const middleware = require("./middleware/middleware");
const bcrypt = require("bcryptjs");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const { Update } = require("./model/update");
const updating = require("./routes/updating");
const quizzes = require("./routes/quizzes");
const { Quiz } = require("./model/quiz");

require("./logging")();
require("./prod")(app);


app.use(cookieParser());
app.use(express.json());
app.use(cors());



mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then(() => console.log(`Connected to ${config.get("db")}...`))
  .catch((err) =>
    console.log(`Could not connect to ${config.get("db")}...`, err)
  );



app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", auth);
app.use("/admin", admin);
app.use("/update", updating);
app.use("/quiz", quizzes);

app.set("view engine", "pug");
app.set("view engine", "ejs");

app.get("/", async function (req, res) {
  const updates = await Update.find().sort("-date");
  res.status(200).render("first.pug", { updates: updates });
});

app.get("/test", async function (req, res) {
  const updates = await Update.find().sort("-date");
  res.status(200).render("first.ejs", { updates: updates });

});

app.get("/quiz", async function (req, res) {
  const quizzes = await Quiz.find();
  res.status(200).render("quiz.pug", { quizzes: quizzes });
});

app.get("/first", async function (req, res) {
  const updates = await Update.find().sort("-date");
  res.status(200).render("first.pug", { updates: updates });
});

app.get("/about", async function (req, res) {
  res.render("about.ejs");
});

app.get("/gallery", async function (req, res) {
  res.render("gallery.ejs");
});

app.get("/admission", async function (req, res) {
  res.render("admission.ejs");
});

app.get("/facilities", async function (req, res) {
  res.render("facilities.ejs");
});

app.get("/syllabus", async function (req, res) {
  res.render("syllabus.ejs");
});

app.get(
  "/.well-known/acme-challenge/CmC0XuVByQcpuFulaWc11WzQpOnpskQBGgzYXOtzZUc",
  async function (req, res) {
    var contents = await fs.readFileSync(
      "./.well-known/acme-challenge/CmC0XuVByQcpuFulaWc11WzQpOnpskQBGgzYXOtzZUc",
      "utf8"
    );
    res.send(contents);
  }
);

app.get(
  "/.well-known/acme-challenge/VF_NzKN-IrkJzRYi2r_BL9xwyvRnNwHQCOZq-aV1onM",
  async function (req, res) {
    var contents = await fs.readFileSync(
      "./.well-known/acme-challenge/ZlFtK_BeIypl2AulfbC8T07GJv5UAeLuoOIjZ3otgbA",
      "utf8"
    );
    res.send(contents);
  }
);

const port = process.env.PORT || 3000;
console.log(port);
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
var env = process.env.NODE_ENV || "development";
console.log(env);
module.exports = server;
