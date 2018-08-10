const createError = require('http-errors');
const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');
const Request = require('../models/request.model');
const Review = require('../models/review.model');
const cloudinary = require('cloudinary');
const axios = require('axios');
const moment = require('moment');

module.exports.create = (req, res, next) => {
  res.render('bbqs/create', { apiKey: process.env.GPLACES_API_KEY });
}

module.exports.doCreate = (req, res, next) => {
  req.body.user = req.user._id;
  const bbq = new Bbq(req.body);
  cloudinary.uploader.upload(req.file.path, function(result) { 
    console.log('picture saved to cloudinary!');
    console.log(result);
    bbq.photo = result.url;
    bbq.save()
      .then(bbq => {
        console.log('bbq created!', bbq);
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

module.exports.getBbqLocation = (req, res, next) => {
  Bbq.findById(req.params.id)
    .then(bbq => {
      let bbqLocation = {
        lat: bbq.location.coordinates[0],
        lng: bbq.location.coordinates[1],
        bbqId: bbq._id
      }
      res.json({ data: bbqLocation });
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
        axios.get('https://www.metaweather.com/api/location/766273/' + moment(bbq.date).format('YYYY/MM/DD'))
          .then(response => {            
            let minTemp = 0;
            let maxTemp = 0;
            let state = []
            for (let i = 0; i < response.data.length; i++) {
              minTemp += response.data[i].min_temp;
              maxTemp += response.data[i].max_temp;
              state.push(response.data[i].weather_state_abbr);
            }
            bbq.minTemp = minTemp / response.data.length;
            bbq.maxTemp = maxTemp / response.data.length;
            bbq.state = countStatus(state);
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
                      if (ownerRequest.status === 'waiting for payment') {
                        bbq.waiting = true;
                        bbq.requestId = ownerRequest._id;
                      }
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
          })
          .catch(function (error) {
            console.log(error);
          })
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

function getWeather(date) {
  date = moment(date).format('YYYY/MM/DD');
  axios.get('https://www.metaweather.com/api/location/766273/' + date)
    .then(response => {
      let minTemp = 0;
      let maxTemp = 0;
      let state = []

      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].max_temp);
        minTemp += response.data[i].min_temp;
        maxTemp += response.data[i].max_temp;
        state.push(response.data[i].weather_state_abbr);
      }

      minTemp /= response.data.length;
      maxTemp /= response.data.length;

      return {
        state: countStatus(state),
        minTemp: minTemp /= response.data.length,
        maxTemp: maxTemp /= response.data.length
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
}

function countStatus(array) {
  let obj = array.reduce((acc, next) => {
    if (next in acc) {
      acc[next]++;
    } else {
      acc[next] = 1
    }
    return acc;
  }, {})
  let max = 0;
  let result; 
  for (prop in obj) {    
    if (obj[prop] > max) {
      max = obj[prop];
      result = prop;
    }
  }
  console.log('countStatus', result);
  return result;
}
