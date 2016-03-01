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
       if(polls){
          var pollstr="<ul>";
          for (var i=0;i<polls.length;i++){
            
             pollstr += '<li><a href="/polls/'+ polls[i].id+'">' + polls[i].question + '</a></li>';
           }
           pollstr+= "</ul>"
           
           var data = {
              polls: pollstr
           }
           
            
                fs.readFile('public/index.html', 'utf-8', function(error, source){
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                }); 

       } else {
         console.log ("no polls yet");
       }

    });

    //res.sendFile(process.cwd() + '/public/index.html');
});
//Base case user visits home screen

};
