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
     
     //check if user is logged in

               if (req.isAuthenticated()) {
                   loggedin = true;
           
             } else {
                  loggedin = false;

             }
             
             
             //builds a list of 5 most recent polls if any have been deleted skips them
             
    Polls.find().sort('-id').limit(5).exec(function(err, polls){
       if (err) throw err;
       if(polls){
          var pollstr="<ul>";
          for (var i=0;i<polls.length;i++){
              if (polls[i].question.length >1){
                 pollstr += '<li><a href="/polls/'+ polls[i].id+'">' + polls[i].question + '</a></li>';
              }
           }
           pollstr+= "</ul>"
           
          
             
    
           
           var data = {
              polls: pollstr,
              loggedin: loggedin
           }
           
            
            //handle bars on front page to fill in polls and login info
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

app.use(passport.initialize());
app.use(passport.session());
//Base case user visits home screen

};
