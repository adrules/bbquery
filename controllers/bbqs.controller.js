const createError = require('http-errors');
const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');
const Request = require('../models/request.model');

module.exports.create = (req, res, next) => {
  res.render('bbqs/create', { apiKey: process.env.GPLACES_API_KEY });
}

module.exports.doCreate = (req, res, next) => {
  req.body.user = req.user._id;
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

module.exports.list = (req, res, next) => {
  Bbq.find({ public: true })
    .populate('user')
    .then(bbqs => {
      res.render('bbqs/list', { 
        bbqs
      });
    })
    .catch(error => {
      next(error);
    });
}

module.exports.getBbqsLocations = (req, res, next) => {
  Bbq.find()
    .then(bbqs => {

      let bbqsLocation = bbqs.map(bbq => {
        return { 
          lat: bbq.location.coordinates[0],
          lng: bbq.location.coordinates[1]
        }});
        
      res.json({ data: bbqsLocation });
    })
    .catch(e => console.error(e));
};

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Bbq.findById(id)
    .populate('user')
    .then(bbq => {
      if (bbq) {
        bbq.latitude = bbq.location.coordinates[0];
        bbq.longitude = bbq.location.coordinates[1];
        if (req.user) {
          if (bbq.user.equals(req.user._id)) {
            bbq.organizer = true;
          }
          Request.findOne({ user: req.user._id, bbq: bbq._id })
            .then(request => {
              if (request) {
                bbq.requested = true;
                if (request.status === 'confirmed' && request.user.equals(req.user._id)) {
                  bbq.paid = true;
                }
              }              
              res.render('bbqs/detail', {
                bbq, 
                apiKey: process.env.GPLACES_API_KEY
              });
            })
        } else {
          res.render('bbqs/detail', {
            bbq, 
            apiKey: process.env.GPLACES_API_KEY
          });
        }
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