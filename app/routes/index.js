'use strict';

var mongoose = require('mongoose');
var Polls = require('../models/polls.js');
var handlebars  = require('handlebars');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app,db,passport) {
app.route('/')
  .get(function (req, res) {
    //change to error
    
     var loggedin;
           
              console.log("hello")
               if (req.isAuthenticated()) {
                   loggedin = true;
                   console.log("here1");
             } else {
                  loggedin = false;
                   console.log("here2");

             }
    Polls.find().sort('-id').limit(5).exec(function(err, polls){
       if (err) throw err;
       if(polls){
          var pollstr="<ul>";
          for (var i=0;i<polls.length;i++){
            
             pollstr += '<li><a href="/polls/'+ polls[i].id+'">' + polls[i].question + '</a></li>';
           }
           pollstr+= "</ul>"
           
          
             
    
           
           var data = {
              polls: pollstr,
              loggedin: false
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
});
//Base case user visits home screen

};
