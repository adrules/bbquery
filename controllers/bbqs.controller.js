const createError = require('http-errors');
const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');
const Request = require('../models/request.model');
const Review = require('../models/review.model');

module.exports.create = (req, res, next) => {
  res.render('bbqs/create', { apiKey: process.env.GPLACES_API_KEY });
}

module.exports.doCreate = (req, res, next) => {
  req.body.user = req.user._id;
  const bbq = new Bbq(req.body);
  console.log('picture saved!');
  bbq.photo = req.file.filename;
  bbq.save()
    .then(bbq => {
      console.log('bbq created!', bbq._id);
      res.redirect(`${bbq._id}`);
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
          lng: bbq.location.coordinates[1],
          bbqId: bbq._id
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

        Review.find({ bbqReviewed: bbq._id })
          .populate('userReviewer')
          .then(reviews => {
            bbq.reviews = reviews;
          })
          .catch(error => next(error));

        if (req.user) {
          if (bbq.user.equals(req.user._id)) {
            bbq.organizer = true;
          }
          Request.find({bbq: bbq._id })
            .populate('user')
            .then(requests => {
              if (requests) {
                bbq.requests = requests;
                let ownerRequest = bbq.requests.find(function(request){ return request.user.equals(req.user._id)});
                if (ownerRequest) {
                  bbq.requested = true;
                  if (ownerRequest.status === 'confirmed') {
                    bbq.paid = true;
                  }
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

module.exports.review = (req, res, next) => {
  Review.findOne({ bbqReviewed: req.body.bbqid, userReviewer: req.user._id })
    .then(review => {
      if (!review) {
        new Review({
          bbqReviewed: req.body.bbqid,
          userReviewer: req.user._id,
          userReviewed: req.body.reviewed,
          rate: req.body.rate,
          message: req.body.review
        }).save()
          .then(review => {
            console.log(`${review.message} saved!`);
            res.redirect(`/bbqs/${req.body.bbqid}`);
          })
          .catch(error => {next(error)});
      } else {
        console.log('YO! you already reviewed this BBQ');
        res.redirect(`/bbqs/${req.body.bbqid}`);
      }
    })
    .catch(error => {next(error)});
}
