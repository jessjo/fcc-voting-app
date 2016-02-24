'use strict';

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var express = require('express');
var Polls = require('../models/polls.js');


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
    //while fields exist
    
    //id should count how many entries exist and augment by one
    Polls.count({}, function(err, count){
      if (err){ throw err;}
        console.log( "Number of docs: ", count );
        
           var newDoc = new Polls({ 'question': req.body['question'],
           choices: [{ "category": "Pizza", "votes": 0 }],
           id: count+1 });
           newDoc.save(function (err, doc) {
         if (err) { throw err; }
          res.json(doc);
    });
    });
 
   
      
	  //res.status(204).end();
});

//user visits poll creation page

};