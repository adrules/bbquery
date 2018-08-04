const mongoose = require('mongoose');
const passport = require('passport');

module.exports.login = (req, res, next) => {
  res.render('./sessions/login');
}

module.exports.doLogin = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render('./sessions/login', {
      user: req.body,
      errors: errors
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    renderWithErrors({
      email: email ? undefined : 'Email is required',
      password: password ? undefined : 'Password is required'
    });
  } else {
    passport.authenticate('local-auth', (error, user, validation) => {
      if (error) {
        next(error);
      } else if (!user) {
        renderWithErrors(validation);
      } else {
        req.login(user, (error) => {
          if (error) {
            next(error)
          } else {
            res.redirect('/users/testauth');
          }
        });
      }
    })(req, res, next);
  }
}
