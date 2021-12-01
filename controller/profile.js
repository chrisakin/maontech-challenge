const jwt = require('jsonwebtoken');
const Profile = require('../models/profileModel');
const checkJWT = require('../middleware/check-jwt');
const User = require('../models/userModel');

 const getProfile = ((req, res, next) => {
    Profile.findOne({ _id: req.decoded.user._id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ error: "Profile not found" });
        }
        res.json(profile);
      })
      .catch((err) => console.log("error in profile/ route", err));
  })

  const createProfile = ((req, res, next) => {
    const profileValues = {};
    profileValues.user = req.decoded.user._id;
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.website) profileValues.website = req.body.website;
    if (req.body.country) profileValues.country = req.body.country;
    if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
    if (typeof req.body.languages !== undefined) {
      profileValues.languages = req.body.languages.split(",");
    }
    //get social links
    profileValues.social = {};
    if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
    if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
    if (req.body.instagram) profileValues.social.instagram = req.body.instagram;

    //database stuff
    Profile.findOne({ _id: req.decoded.user._id })
      .then((profile) => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.decoded.user._id },
            { $set: profileValues },
            { new: true }
          )
            .then((profile) => res.json(profile))
            .catch((err) => console.log("error in update profile ", err));
        } else {
          Profile.findOne({ username: profileValues.username })
            .then((profile) => {
              if (profile) {
                res.status(400).json({ error: "Username already exists" });
              } else {
                new Profile(profileValues)
                  .save()
                  .then((profile) => res.json(profile))
                  .catch((err) => console.log("error in profile saving", err));
              }
            })
            .catch((err) => console.log("error in create profile", err));
        }
      })
      .catch((err) => console.log("Error in fetching profile", err));
  })

  const getuserbyUsername = ((req, res, next) => {
    Profile.findOne({ username: req.params.username })
    .populate("user", ["name", "profilepic"])
    .then((profile) => {
      if (!profile) res.status(404).json({ error: "User not found" });
      else res.json(profile);
    })
    .catch((err) => console.log("error in fetching username", err));
  });

  const getuserbyId = ((req, res, next) => {
    Profile.findOne({ _id: req.decoded.user._id })
    .populate("user", ["name", "profilepic"])
    .then((profile) => {
      if (!profile) res.status(404).json({ error: "User not found" });
      else res.json(profile);
    })
    .catch((err) => console.log("error in fetching username", err));
  });

    const getallUsers = ((req, res, next) => {
        Profile.find()
        .populate("user", ["name", "profilepic", "email"])
        .then((profiles) => {
          if (!profiles) res.status(404).json({ error: "No profile found" });
          else res.json(profiles);
        })
        .catch((err) => console.log("error in fetching all profiles", err));
    });

    const deleteUser = ((req, res, next) => {
        Profile.findOneAndRemove({ user: req.decoded.user._id })
        .then(() => {
          User.findOneAndRemove({ _id: req.decoded.user._id })
            .then(() => res.json({ message: "Successfully deleted user" }))
            .catch((err) => console.log("error in deleting by id", err));
        })
        .catch((err) => console.log("Error in deleting user", err));
    }
  );

  const addWorkrole = ((req, res, next) => {
    Profile.findOne({_id: req.decoded.user._id })
    .then((profile) => {
      if (!profile) res.status(404).json({ error: "Profile not found" });
      else {
        const newWork = {
          role: req.body.role,
          company: req.body.company,
          country: req.body.country,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          details: req.body.details,
        };
        profile.workrole.push(newWork);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => {
            console.log("error in saving workrole", err);
            res.status(400).json({ error: "some error occurred" });
          });
      }
    })
    .catch((err) => console.log("error in mywork route", err));
    });

    const removeWorkrole = ((req, res, next) => {
        Profile.findOne({ _id: req.decoded.user._id })
        .then((profile) => {
          if (!profile) res.status(404).json({ error: "profile not found" });
          else {
            const removeThis = profile.workrole
              .map((item) => item.id)
              .indexOf(req.params.w_id);
            if (removeThis !== -1) {
              profile.workrole.splice(removeThis, 1);
            }
            profile
              .save()
              .then((profile) => res.json(profile))
              .catch((err) =>
                console.log("error in workrole delete profile save", err)
              );
          }
        })
        .catch((err) => console.log("error in delete workrole", err));
        });

  module.exports = {
    getProfile,
    createProfile,
    getuserbyUsername,
    getuserbyId,
    getallUsers,
    deleteUser,
    addWorkrole,
    removeWorkrole
   }