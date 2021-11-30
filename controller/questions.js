const jwt = require('jsonwebtoken');
const Question = require('../models/questionsModel');
const checkJWT = require('../middleware/check-jwt');
const  passport = require( "passport");

const postQuestions = (checkJWT, (req, res, next) => {
    let question = new Question(req.body);
  question.save()
  .then(() => res.json({
    success: true,
    message: "Successful"
  }))
  .catch((err) => {
        console.log("Unable to save question in db", err);
        res.status(400).json({ error: "Fill all fields" });
   });
})

  const getQuestions = ((req, res, next) => {
    Question.find()
    .sort({ date: "desc" })
    .then((questions) => res.json({
        success: true,
        questions: questions,
        message: "Successful"
    }))
    .catch((err) => {
      console.log("No questions found", err);
      res.status(400)
      .json({ 
          error: "Some error occured"
      });
    });
  })

  const postAnswers = (checkJWT, (req, res, next) => {
    Question.findById(req.params.id)
    .then((question) => {
      const newAnswer = {
        user: req.user.id,
        name: req.body.name,
        text: req.body.text,
      };
      question.answers.push(newAnswer);
      question
        .save()
        .then((question) => res.json(question))
        .catch((err) => {
          console.log("err saving question");
          res.status(400).json({ error: "some error occured" });
        });
    })
    .catch((err) => {
      console.log("error in finding question by id", err);
      res.status(400).json({ error: "some error occured" });
    });
})



  const upvoteAnswers = (checkJWT, (req, res, next) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Question.findById(req.params.id)
          .then((question) => {
            if (
              question.upvotes.filter(
                (upvote) => upvote.user.toString() === req.user.id.toString()
              ).length > 0
            ) {
              question.upvotes.pop({ user: req.user.id });
              question
                .save()
                .then((question) => res.json(question))
                .catch(console.log);
            } else {
              question.upvotes.push({ user: req.user.id });
              question
                .save()
                .then((question) => res.json(question))
                .catch(console.log);
            }
          })
          .catch(console.log);
      })
      .catch((err) => {
        console.log("error in profile findone", err);
        res.status(400).json({ error: "some error occured" });
      });
  })

  module.exports = {
    postQuestions,
    getQuestions,
    postAnswers,
    upvoteAnswers
   }