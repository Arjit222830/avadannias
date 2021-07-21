const express = require("express");
const router = express.Router();
const { Quiz, validate } = require("../model/quiz");
const middleware = require("../middleware/middleware");
const mongoose = require("mongoose");

router.get("/submit", async (req, res) => {
  res.send({
    link: "/quiz",
    message1: "You answer ",
    message2: " out of ",
    message3: " questions correctly",
  });
});

router.post("/add", async (req, res) => {
  const { error } = validate(req.body); //result.error(joi package)
  if (error) return res.status(400).send(error.details[0].message);

  const quiz = new Quiz({
    question: req.body.question,
    options: {
      A: req.body.A,
      B: req.body.B,
      C: req.body.C,
      D: req.body.D,
    },
    correctOption: req.body.correctOption,
  });

  await quiz.save();

  res.send({
    link: "/admin/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
    message: "A question is added",
  });
});

router.post("/", async (req, res) => {
  const quizzes = await Quiz.find();
  const index = req.body.index;
  var correctOp = quizzes[index].correctOption;
  if (req.body.choice == null) res.send("");
  else if (req.body.choice == correctOp) res.send({ result: "Correct" });
  else
    res.send({ result: "Wrong", correct: quizzes[index].options[correctOp] });
});

router.delete("/", async (req, res) => {
  const remove = await Quiz.findByIdAndRemove(req.body.id);
  if (!remove) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.send({
    link: "/admin/6MayMMExW08NiAq92aMWKSNjWANjsxzhnjaskdhoijwasmx",
    message: "A question has been removed",
  });
});

module.exports = router;
