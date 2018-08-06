const mongoose = require('mongoose');
const Request = require('../models/request.model');

module.exports.doCreate = (req, res, next) => {
  console.log('hola req controller');
  console.log('user', req.user);
  Request.findOne({user: req.user._id, bbq: req.body.bbq})
    .then(request => {
      console.log(request);
      if (request) {
        console.log('YO! you already applied to this BBQ');
        res.render(`../bbqs/${request.bbq}`, {
          errors: { message: 'You already applied to this BBQ!' }
        });
      } else {
        const request = new Request(req.body);
        request.user = req.user._id;
        request.save()
          .then(request => {
            console.log('nice! saving request!', request);
            res.redirect(`/bbqs/${request.bbq}`);
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
    });  
}
