'use strict';

var mongoose = require('mongoose');
var Polls = require('../models/polls.js');

module.exports = function (app, db) {
app.route('/polls/:pollID')
  .get(function (req, res) {
    var pollID = Number(req.params.pollID);
    if(Number.isInteger(pollID)){
        Polls.findOne({ 'id': pollID }, function (err, poll) {
             if (err) throw err;
             if(poll){
                console.log(poll.question);
                
                
             } else {
                  console.log("no result")
             }
        
        })
    } else {
        //not an integer pollID
        console.log ("Incorrect Poll ID should 404");
    }
    
    res.sendFile(process.cwd() + '/public/index.html');
});
//Base case user visits home screen

};

function formatPoll (poll, callback){
    var formatted = []
    for (var i=0; i<poll.choices.length; i++){
        formatted.push({value: poll.choices[i].votes,label: poll.choices[i].category,color: '#00000'});
    }
}