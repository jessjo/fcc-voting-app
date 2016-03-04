'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var mongoose = require('mongoose');
var UserDetails = require('../models/users.js');
var fs = require('fs');
var handlebars  = require('handlebars');

module.exports = function (app, db, passport) {
    
app.get('/login', function(req, res) {
//don't allow access to login if already logged in

      var data = {
              error:false
           }
      fs.readFile('public/login.html', 'utf-8', function(error, source){
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                }); 

});

//this isn't authenticating
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
     var data = {
              error:true
           }
      fs.readFile('public/login.html', 'utf-8', function(error, source){
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                }); 
});

app.get('/loginSuccess', function(req, res, next) {

//redirects to homepage on succe
res.redirect("/");

  
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
     UserDetails.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }


       user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
            if(!isMatch){
              return done(null, false);
            } else {
               return done(null, user);
            }
          });
    });
  });
}));

};