const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
// Load User Model
const User = require("../model/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route   POST api/users/test
// @desc    Tests users route
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }
  User.findId(req.body).then(user => {
    console.log("user", user);
    if (user.length) {
      errors.uid = 'User ID already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = {
        uid: req.body.uid,
        upw: req.body.upw,
        gender: req.body.gender
      };
      bcrypt.genSalt(10, (err, salt) => {
        console.log("newUser.upw", newUser.upw);

        bcrypt.hash(newUser.upw, salt, (err, hash) => {
          console.log("err", err);
          if (err) throw err;

          newUser.upw = hash;
          console.log("bcryt", newUser.upw);
          User.register(newUser)
            .then(user => res.json(newUser))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }
  const uid = req.body.uid;
  const upw = req.body.upw;
  const pName = "Seulki";

  //Find user by USER ID
  User.findOne({ uid }).then(user => {
    // Check for User
    if (!user.length) {
      errors.uid = 'User not found';
      return res.status(404).json(errors);
    }

    // Check for Password
    bcrypt.compare(upw, user[0].upw).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          uid: user[0].uid,
          name: user[0].uname,
          author: pName
        }; //Create JWT payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.upw = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user[0];
    res.json({
      id: user.uid,
      name: user.uname,
      gender: user.usex
    });
  }
);

module.exports = router;
