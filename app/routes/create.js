'use strict';

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var express = require('express');
//var models = require('./app/models/polls.js');


//For creating polls

module.exports = function (app, db) {
    
var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.route('/create')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/public/create.html');
});



app.post('/create',  upload.array(), function (req, res, next) {

    console.log(req.body)
      
	  res.status(204).end();
});

//user visits poll creation page

};