'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var mongoose = require('mongoose');
var UserDetails = require('../models/users.js');

module.exports = function (app, db, passport) {
    
app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + '/public/login.html');
});

//this isn't authenticating
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  //use handlebars???
    console.log("passport user", req.user);

  res.sendFile(process.cwd() + '/public/index.html');
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
            }
          });
      console.log(user);
      return done(null, user);
    });
  });
}));

};