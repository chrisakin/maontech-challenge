const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/secret');
const checkJWT = require('../middleware/check-jwt');
const  passport = require( "passport");

//Function to facilitate Sign Up feature 
//@route /api/auth/signup
const signUp =((req, res, next) => {
    let user = new User(req.body);
    user.picture = user.gravatar();

// authenticate user so they dont sign up with the same mail twice
    User.findOne({ email: req.body.email }, (err, existingUser) => {
     if (existingUser) {
       res
       .status(400)
       .json({
         success: false,
         message: 'Account with that email already exists'
       });
     } else {
       user.save();
       var token = jwt.sign({
         user: user
       }, config.secret, {
         expiresIn: '1d'
       });
       res
       
       .json({
         success: true,
         message: 'SignUp Successful',
         token: token
       });
     }
    });
   });

//Function to facilitate login feature
const logIn = ((req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.json({
          success: false,
          message: 'Authenticated failed, User not found'
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
          });
        } else {
          var token = jwt.sign({
            user: user
          }, 
           config.secret, {
            expiresIn: '1d'
          });
          res.json({
            success: true,
            mesage: "Login Successful",
            token: token
          });
        }
      }
    });
  });

//Function to handle Profile API functionality for authenticated users 
const getoneProfile = (checkJWT, (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    res.json({
      success: true,
      user: user,
      message: "Successful"
    });
  });
})

   module.exports = {
    signUp,
    logIn,
    getoneProfile,
   }