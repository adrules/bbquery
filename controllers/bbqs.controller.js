const createError = require('http-errors');
const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');

module.exports.create = (req, res, next) => {
  res.render('bbqs/create', { apiKey: process.env.GPLACES_API_KEY });
}

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);
  const bbq = new Bbq(req.body);
  bbq.save()
    .then(() => {
      console.log('bbq saved!!');
      res.send('bbq created!!!');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        res.render('bbqs/create', { 
          bbq: bbq,
          errors: error.errors
        });
      } else {
        next(error);
      }
    });
}
