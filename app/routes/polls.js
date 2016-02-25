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
    var formatted = '{ "dataset" : [{"seriesname" :"Petrol Prices","data" : [{"value": 64.72}]},{"seriesname" :"Diesel Prices","data" : [{"value": 52.49}]}],"categories" : [{"label":"Jan"}]}';
}