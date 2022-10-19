const  createError = require('http-errors');
const  express = require('express');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const db = require("./models/index");

const  allRouter = require('./routes/index');
// const userRouter = require('./routes/users.route');
// const clubRouter = require('./routes/club.route');
// const coachRouter = require('./routes/coach.route');
// const playerRouter = require('./routes/player.route');


var app = express();

// db.sequelize.sync({ force: true })
db.sequelize.sync({alter: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', allRouter.router);
app.use('/user', allRouter.userRouter);
app.use('/club', allRouter.clubRouter);
app.use('/coach', allRouter.coachRouter);
app.use('/player', allRouter.playerRouter);
app.use('/auth', allRouter.authRouter);
// app.use()

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
  res.render('error');
});

module.exports = app;
