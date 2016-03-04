'use strict';

var express = require('express');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var UserSchema = require('../models/users.js');
var handlebars  = require('handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, db, passport) {
    
app.get('/createaccount', function(req, res) {

   var data = {
              error:false
           }
      fs.readFile('public/createaccount.html', 'utf-8', function(error, source){
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                }); 

});

app.post('/createaccount', upload.single(), function(req, res){
     UserSchema.findOne({
      'username': req.body["username"], 
    }, function(err, user) {
        if (err) throw err;
        if (user){
            console.log("user already exists")
             //redirect to this page with error message?
            var data = {
              error:true
           }
           
            fs.readFile('public/createaccount.html', 'utf-8', function(error, source){
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                });
           
        } else {
            var newUser = new UserSchema({ username: req.body["username"],
           password: req.body["password"]});
           newUser.save(function (err, doc) {
               
               
            if (err) { throw err; }
            
                
                
            });
         
           
           res.redirect("/login");
       
          
        }
    });
});


app.get('/creationFailure', function(req, res, next) {
  res.send('Failed to create');
});

app.get('/creationSuccess', function(req, res, next) {
  res.send('Successfully created');
});


};