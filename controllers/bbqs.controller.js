const createError = require('http-errors');
const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');

module.exports.create = (req, res, next) => {
  res.render('bbqs/create', { apiKey: process.env.GPLACES_API_KEY });
}

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);
}

module.exports.list = (req, res, next) => {
  Bbq.find({ public: true })
    .then(bbqs => {
      res.render('bbqs/list', { 
        bbqs
      });
    })
    .catch(error => {
      next(error);
  });
}