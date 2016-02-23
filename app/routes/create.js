'use strict';

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var express = require('express');



//For creating polls

module.exports = function (app) {
    
    var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.route('/create')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/public/create.html');
});


var cpUpload = upload.fields([{ name: 'question', maxCount: 1 }, { name: 'prof1', maxCount: 8 }])
app.post('/create',  function (req, res, next) {

      console.log(req.body)
	  res.status(204).end();
});

//user visits poll creation page

};