'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var create = require('./app/routes/create.js');
var polls = require('./app/routes/polls.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var mongo = require('mongodb').MongoClient;

var app = express();
require('dotenv').load();

mongoose.connect('mongodb://localhost:27017/clementinejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  routes(app);
  create(app, db);
  polls(app,db);
  
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');

});