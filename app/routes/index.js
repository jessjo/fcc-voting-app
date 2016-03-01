'use strict';

var mongoose = require('mongoose');
var Polls = require('../models/polls.js');
var handlebars  = require('handlebars');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app,db) {
app.route('/')
  .get(function (req, res) {
    //change to error
    Polls.find().sort('-id').limit(5).exec(function(err, polls){
       if (err) throw err;
       for (var i=0;i<polls.length;i++){
         console.log(polls[i].question);
       }
    });
    res.sendFile(process.cwd() + '/public/index.html');
});
//Base case user visits home screen

};
