const mongoose = require('mongoose');
const Request = require('../models/request.model');
const User = require('../models/user.model');
const Bbq = require('../models/bbq.model');

const mailer = require('../services/mailer.service');

module.exports.doCreate = (req, res, next) => {
  Request.findOne({user: req.user._id, bbq: req.body.bbq})
    .then(request => {
      if (request) {
        res.render(`../bbqs/${request.bbq}`, {
          errors: { message: 'You already applied to this BBQ!' }
        });
      } else {
        const request = new Request(req.body);
        request.user = req.user._id;
        request.save()
          .then(request => {
            console.log('New request saved to db:', request._id);
            Bbq.findById(req.body.bbq)
              .then(bbq => {
                User.findById(bbq.user)
                  .then(user => {
                    mailer.newRequest(request, req.user, bbq, user.email);
                    console.log(`Email sent to ${user.email}: new request`);
                    res.redirect(`/bbqs/${request.bbq}`);
                  })                
              })            
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

module.exports.doAccept = (req, res, next) => {
  Request.findById(req.query.id)
    .then(request => {
      if (!request) {
        console.error('intento de accept request FAIL:', req.query.id)
      } else {
        Request.findByIdAndUpdate(req.query.id, {status: 'accepted'})
          .then(request => {
            console.log(`Request accepted: ${req.query.id}`);
            User.findById(request.user)
              .then(user => {
                mailer.acceptedRequest(request, user.email);
                console.log(`Email sent to ${user.email}: request accepted: ${request}`);
                res.redirect(`/bbqs/${request.bbq}`);
              })    
          })
      }
    })  
}

module.exports.pay = (req, res, next) => {
  Request.findById(req.query.id)
    .then(request => {
      if (!request) {
        console.error('intento de pay request FAIL:', req.query.id)
      } else {
        Request.findByIdAndUpdate(req.query.id, {status: 'confirmed'})
          .then(request => {
            console.log(`Request confirmed: ${req.query.id}`);
            User.findById(request.user)
              .then(user => {
                mailer.confirmedRequest(request, user.email);
                console.log(`Email sent to ${user.email}: request confirmed: ${request}`);
                res.redirect(`/bbqs/${request.bbq}`);
              })    
          })
      }
    })  
}

// module.exports.pay = (req, res, next) => {
//   Request.findById(req.query.id)
//     .then(request => {
//       if (!request) {
//         console.error('intento de accept request FAIL:', req.query.id)
//       } else {
//         Request.findByIdAndUpdate(req.query.id, {status: 'confirmed'})
//           .then(request => {
//             User.findById(request.user)
//               .then(user => {
//                 mailer.confirmed(request._id, user.email);
//                 console.log(`Email sent to ${user.email}: confirmed`);
//                 res.redirect(`/bbqs/${request.bbq}`);
//               })
//             console.log(`Request confirmed: ${req.query.id}`);            
//             res.redirect(`../bbqs/${request.bbq}`);
//             mailer.acceptedRequest(request._id, req.user, bbq, user.email);
//             mailer.acceptedRequest();
//             console.log(`Email sent to ¿?: accepted ...`);
//           })
//       }
//     })  
// }
