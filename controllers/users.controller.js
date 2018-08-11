const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Bbq = require('../models/bbq.model');
const Review = require('../models/review.model');
const Request = require('../models/request.model');

const mailer = require('../services/mailer.service');

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
        var rand = function() {
          return Math.random().toString(36).substr(2); // remove `0.`
        };      
        var token = function() {
          return rand() + rand(); // to make it longer
        };
        req.body.token = token();
        req.body.image = "image-route";
        user = new User(req.body);
        return user.save()
          .then(user => {
            mailer.confirmSignUp(user);
            console.log(`Email sent to ${user.email}: Activation`);
            res.render('sessions/login', {message: "User created! Please check your email to activate it"});
          });
      }
    })
    .catch(error => {
      console.error(error);
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

module.exports.activate = (req, res, next) => {
  User.findById(req.query.user)
    .then(user => {
      if (user) {
        if (user.active) {
          console.log('User is already activated, redirecting...'); 
          res.render('users/testauth', {message: "Hey! You already activated your account!"});
        } else {
          if (user.token === req.query.token) {
          user.set({ active: true });
          User.findByIdAndUpdate(req.query.user, {active: true})
            .then(() => {
              console.log(`User ${user._id} activated!! :)`);
              res.render('sessions/login', {message: "User activated! Please login"});
            })
            .catch(error => console.log(error))
          }
        }
      } else {
        res.redirect(`../users/create`);
      }      
    })
    .catch(e => console.error(e))
}

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        Promise.all([
          Bbq.find({user: user._id}),
          Review.find({userReviewed: user._id}).populate('userReviewer'),
          Request.find({user: user._id}, {bbq: true}).populate('bbq')
        ])
        .then(results => {

          const [bbqsOrg, reviews, requests] = results;

          let userData = {
            user: user,
            bbqsOrg: bbqsOrg,
            reviews: reviews,
            bbqsAtt: requests
          }
          
          res.render('users/detail', { userData });
        })
        .catch(error => next(error));
      } else {
        res.redirect(`/`);
      }
    })  
}