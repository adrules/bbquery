const createError = require('http-errors');
const mongoose = require('mongoose');
// const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('users/create', {
    user: "Usuario"
  });

  /*res.render('users/create', {
    user: new User()
  });*/
}

module.exports.doCreate = (req, res, next) => {
  console.log("doCreat has to be implemented");
  // res.redirect('/users/create');

  /*
  const newUser = new User(req.body);

  console.log(`REQ BODY: ${JSON.stringify(req.body)}`);

  User.findOne({ email: newUser.email })
    .then((user) => {
      if (user) {
        return res.render('users/create', {
          user: newUser,
          errors: {
            email: "already exists"
          }
        });       
      } else {
        newUser.save()
          .then((user) => {
            res.redirect("/");
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('users/create', { 
                user: newUser,
                errors: error.errors
              });
            } else {
              next(error);
            }
          });
      }
    })
    .catch((error) => {
      next(error);
    });
    */
}
