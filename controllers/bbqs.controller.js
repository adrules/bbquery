const createError = require('http-errors');
const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');

module.exports.create = (req, res, next) => {
  res.render('bbqs/create', { apiKey: process.env.GPLACES_API_KEY });
}

module.exports.doCreate = (req, res, next) => {
  const bbq = new Bbq(req.body);
  bbq.save()
    .then((newBbq) => {
      res.redirect(`${newBbq.id}`);
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

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Bbq.findById(id)
    .then(bbq => {
      if (bbq) {
        bbq.latitude = bbq.location.coordinates[1];
        bbq.longitude = bbq.location.coordinates[0];
        res.render('bbqs/detail', {
          bbq
        });
      } else {
        next(createError(404, `Bbq not found :(`));
      }
  })
  .catch(error => {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(404, `Bbq not found :(`));
    } else {
      next(error);
    }
  });
}