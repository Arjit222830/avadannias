const express = require("express");
const config = require("config");
const router = express.Router();
const { Admin, validate } = require("../model/model");
const middleware = require("../middleware/middleware");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const _ = require("lodash");
const { Detail } = require("../model/detail");
const { Update } = require("../model/update");
const { Quiz } = require("../model/quiz");

router.get("/", async function (req, res) {
  res.sendFile("./public/admin.html", { root: __dirname });
});

router.get(
  "/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
  async function (req, res) {
    const details = await Detail.find().sort("-date");
    const updates = await Update.find().sort("date");
    const quizzes = await Quiz.find();

    res.render("index", {
      variable: details,
      updates: updates,
      quizzes: quizzes,
    });
  }
);

router.post("/", async (req, res) => {
  const { error } = validate(req.body); //result.error(joi package)
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Admin.findOne({ name: req.body.name });

  if (!user) return res.status(400).send("Invalid Username");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid Password");

  res.send({
    link: "admin/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
    message: "Successfully Logged in",
  });
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
