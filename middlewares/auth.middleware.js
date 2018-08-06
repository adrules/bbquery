const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401)
      .redirect('/sessions/login');
  }
}

module.exports.isActive = (req, res, next) => {
  if (req.user.active === true) {
    next()
  } else {
    res.status(401)
      .render('../views/sessions/login', {message: 'Please check your email to activate your user!'});
  }
}