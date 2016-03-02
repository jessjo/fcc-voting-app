'use strict';

var express = require('express');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var UserDetails = require('../models/users.js');

module.exports = function (app, db) {
    
app.get('/createaccount', function(req, res) {
  res.sendFile(process.cwd() + '/public/createaccount.html');
});

app.post('/createaccount', upload.single(), function(req, res){
     console.log(req.body["username"]);
     UserDetails.findOne({
      'username': req.body["username"], 
    }, function(err, user) {
        if (err) throw err;
        if (user){
            console.log("user already exists")
            //redirect to this page with error message?
        } else {
            var newUser = new UserDetails({ username: req.body["username"],
           password: req.body["password"]});
           console.log("reached")
           newUser.save(function (err, doc) {
            if (err) { throw err; }
                 res.redirect('/index');
            });
            console.log("reached")
          //redirect to login page with success message?
          
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