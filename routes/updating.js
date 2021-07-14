const express = require("express");
const router = express.Router();
// const {Update,validate}= require('./update');
const { Update, validate } = require("../model/update");
const middleware = require("../middleware/middleware");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const updates = await Update.find().sort("-date");
  const { error } = validate(req.body); //result.error(joi package)
  if (error) return res.status(400).send(error.details[0].message);

  let update = new Update({
    text: req.body.text,
    link: req.body.link,
  });

  await update.save();

  const addedUpdates = await Update.find().sort("-date");

  res.send({
    link: "/admin/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
    message: "New Update has been updated successfully",
  });
});

router.delete("/", async (req, res) => {
  const remove = await Update.findByIdAndRemove(req.body.id);
  if (!remove) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.send({
    link: "/admin/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
    message: "An update is removed",
  });
});

module.exports = router;
