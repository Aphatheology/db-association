var express = require('express');
var router = express.Router();
const userRouter = require('./users.route');
const playerRouter = require('./player.route');
const coachRouter = require('./coach.route');
const clubRouter = require('./club.route');
const authRouter = require('./auth.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = {router, userRouter, authRouter, playerRouter, coachRouter, clubRouter};
