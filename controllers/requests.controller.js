const mongoose = require('mongoose');
const Request = require('../models/request.model');

module.exports.doCreate = (req, res, next) => {
  req.body.user = req.user._id;
  const request = new Request(req.body);

  Request.findOne({user: request.user, bbq: request.bbq})
    .then(request => {
      if (request) {
        console.log('YO! you already requested');
        res.render(`../bbqs/${request.bbq}`, {
          errors: { message: 'You already applied to this BBQ!' }
        });
      } else {
        request.save()
          .then(request => {
            console.log('nice! saving request!', request);
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
    });  
}
