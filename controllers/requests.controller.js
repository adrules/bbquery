const mongoose = require('mongoose');
const Request = require('../models/request.model');

module.exports.doCreate = (req, res, next) => {
  req.body.user = req.user._id;
  const request = new Request(req.body);
  console.log(request);
  request.save()
    .then(request => {
      console.log(request);
      res.redirect(`../bbqs/${request.bbq}`);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        res.render(`../bbqs/${request.bbq}`, { 
          request: request,
          errors: error.errors
        });
      } else {
        next(error);
      }
    });
}