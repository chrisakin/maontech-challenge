const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');

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

//Function to handle Profile API (GET,POST) functionality for authenticated users 
const getoneProfile = (checkJWT, (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    res.json({
      success: true,
      user: user,
      message: "Successful"
    });
  });
})
const postoneProfile = (checkJWT, (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    if (err) return next(err);
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    user.isSeller = req.body.isSeller;
    user.save();
    res.json({
      success: true,
      message: 'Successfully edited your profile'
    });
  });
});

// Function to get all the signed up isers and their profiles
const getallProfile = (checkJWT, (req, res, next) => {
  User.find({}, (err, user) => {
    res.json({
      success: true,
      user: user,
      message: "Successful"
    });
  });
})

// Function for all users to get their address

const getAddress =(checkJWT, (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    res.json({
      success: true,
      address: user.address,
      message: "Successful"
    });
  });
})

const postAddress = (checkJWT, (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    if (err) return next(err);
    if (req.body.username) user.address.username = req.body.username;
    if (req.body.addr1) user.address.addr1 = req.body.addr1;
    if (req.body.addr2) user.address.addr2 = req.body.addr2;
    if (req.body.city) user.address.city = req.body.city;
    if (req.body.state) user.address.state = req.body.state;
    if (req.body.country) user.address.country = req.body.country;
    if (req.body.postalCode) user.address.postalCode = req.body.postalCode;
    if (req.body.phone) user.address.phone = req.body.phone;
    if (req.body.phone2) user.address.phone2 = req.body.phone2;
    user.save();
    res.json({
      success: true,
      message: 'Successfully posted your address'
    });
  });
});

// Function to add other address
const getotherAddress = (checkJWT, (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, address) => {
    res.json({
      success: true,
      address: address,
      message: "Successful"
    });
  });
})

const postotherAddress = (checkJWT, (req, res, next) => {
  let address = new Address(req.body);
    address.save();
    res.json({
      success: true,
      message: 'Successfully posted your delivery address'
    });
});

   module.exports = {
    signUp,
    logIn,
    getoneProfile,
    postoneProfile,
    getallProfile,
    getAddress,
    postAddress,
    getotherAddress,
    postotherAddress
   }