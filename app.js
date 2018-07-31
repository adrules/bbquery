require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const app = express();

const usersRouter = require('./routes/user.routes');
const bbqsRouter = require('./routes/bbqs.routes');
const sessionRouter = require('./routes/session.routes');

require('./configs/db.config');
require('./configs/passport.config').setup(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// To use session in an express app 
app.use(session({
  secret: 'SuperSecret - (Change it)',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/bbqs', bbqsRouter);
app.use('/sessions', sessionRouter);


// We add req.user to locals to have access from views
app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
