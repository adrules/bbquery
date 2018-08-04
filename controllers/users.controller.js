const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('users/create');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('users/create', {
          user: req.body,
          errors: { email: 'Email already registered' }
        });
      } else {
        // We have to be sure we dont receive user custom parameters
        let userData = req.body;
        userData.image = "image-route";
        user = new User (userData);
        return user.save()
          .then(user => {
            // Will we want to confirm by email?
            res.redirect('/sessions/login');
          });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/create', {
          user: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    });
}

module.exports.testAuth = (req, res, next) => {
  res.render('users/testauth');
}