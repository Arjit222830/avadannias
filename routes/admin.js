const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Admin, validate } = require("../model/model");
const middleware = require("../middleware/middleware");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const _ = require("lodash");
const { Detail } = require("../model/detail");
const { Update } = require("../model/update");
const { Quiz } = require("../model/quiz");
const cookieParser = require("cookie-parser");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async function (req, res) {
  res.sendFile("./public/admin.html", { root: __dirname });
});

router.get("/test", async function (req, res) {
  res.render("admin.ejs");
});

router.get("/arjit", async function (req, res) {
  const details = await Detail.find().sort("-date");
  const updates = await Update.find().sort("date");
  const quizzes = await Quiz.find();

  res.render("index.pug", {
    variable: details,
    updates: updates,
    quizzes: quizzes,
  });
});

// * Token verifier
router.get("/info", verifyToken, async function (req, res) {
  const details = await Detail.find().sort("-date");
  const updates = await Update.find().sort("date");
  const quizzes = await Quiz.find();

  res.render("adminInfo.ejs", {
    details: details,
    updates: updates,
    quizzes: quizzes,
  });
});


router.post("/", async (req, res) => {
  const { error } = validate(req.body); //result.error(joi package)
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body.name);
  console.log(config.get("secret"));
  console.log(config.get("name"));

  if (config.get("name") !== req.body.name)
    return res.status(400).send("Invalid Username");

  if (config.get("password") !== req.body.password)
    return res.status(400).send("Invalid Password");

  const token = jwt.sign(
    { name: req.body.name, password: req.body.password },
    config.get("secret")
  );

  res.cookie("name", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 100),
    httpOnly: false,
  });
  res.redirect("/admin/info");
});

router.put("/", async (req, res) => {
  const { error } = validate(req.body); //result.error(joi package)
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password != req.body.confirmPassword)
    return res.status(400).send("Password and Confirm Passowrd doesn't match");

  let admin = await Admin.findByIdAndUpdate(
    config.get("ID"),
    {
      name: req.body.name,
      password: req.body.password,
    },
    { new: true }
  );

  if (!admin) return res.status(404).send("Given ID was not found"); //404 is error not found

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  await admin.save();

  res.send({
    link: "/admin",
    message: "Admin details has been updated successfully",
  });
});

router.delete("/", async (req, res) => {
  const remove = await Detail.findByIdAndRemove(req.body.id);
  if (!remove) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.send({
    link: "/admin/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
    message: "Removed a student details",
  });
});

module.exports = router;
