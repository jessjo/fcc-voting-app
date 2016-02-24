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
    var categories = [];
    
    //TO DO Add in authorship. Add in voters.
    
    // finds how many fields there are transforms all answer fields into an array of objects
    for (var i=1; i< Object.keys(req.body).length; i++){
      categories[i-1] = {"category":req.body["field"+i], "votes":0 };
    }
    //while fields exis t
    
    //Puts creation in callback. Will count # of records and then give new record ID of count+1
    Polls.count({}, function(err, count){
      if (err){ throw err;}
        console.log( "Number of docs: ", count );
        
           var newDoc = new Polls({ 'question': req.body['question'],
           choices: categories,
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