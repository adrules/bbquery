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
  res.redirect('/users/create');
}
