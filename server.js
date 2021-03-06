'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var create = require('./app/routes/create.js');
var createaccount = require('./app/routes/createaccount.js');
var polls = require('./app/routes/polls.js');
var login = require('./app/routes/login.js');
var mypolls = require('./app/routes/mypolls.js');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local')
var session = require('express-session');
var mongo = require('mongodb').MongoClient;

var app = express();

//Is this the right place for this???
app.use(session({ secret: 'ilovebunnyrabbits' }));
app.use(passport.initialize());
app.use(passport.session());
require('dotenv').load();

mongoose.connect('mongodb://localhost:27017/clementinejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  routes(app, db, passport);
  create(app, db, passport);
  polls(app, db, passport);
  login(app, db, passport);
  createaccount(app,db, passport);
  mypolls(app,db,passport);
  
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');

});