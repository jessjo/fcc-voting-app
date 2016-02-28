'use strict';

var mongoose = require('mongoose');
var Polls = require('../models/polls.js');
var handlebars  = require('handlebars');
var fs = require('fs');

module.exports = function (app, db) {
app.route('/polls/:pollID')
  .get(function (req, res) {
    var pollID = Number(req.params.pollID);
    if(Number.isInteger(pollID)){
        Polls.findOne({ 'id': pollID }, function (err, poll) {
             if (err) throw err;
             if(poll){
               displayChart(poll,res);
             } else {
                  console.log("no result")
             }
        
        })
    } else {
        //not an integer pollID
        console.log ("Incorrect Poll ID should 404");
    }
    
  // res.sendFile(process.cwd() + '/public/poll.html');
});
//Base case user visits home screen

};


// This grabs stuff from the database and formats it for chart.js. First 10 colors are defined, after that colors are random

function formatPoll (poll){
    var formatted = []
    var colorSlice;
   
    for (var i=0; i<poll.choices.length; i++){
         switch (i) {
         case 0:
            colorSlice = "#2E6171";
            break;
         case 1:
            colorSlice = "#556F7A";
            break;
        case 2:
            colorSlice = '#798086';
            break;
         case 3:
             colorSlice = '#B79FAD';
             break;
         case 4:
             colorSlice = '#D4AFCD';
             break;
         case 5:
             colorSlice = '#8A96B5';
             break;
         case 6:
             colorSlice = '#586994';
             break;
         case 7:
             colorSlice = "#924F7C";
             break;
         case 8:
             colorSlice = '#895D88';
             break;
         case 9:
             colorSlice = '#564639';
             break;
         default:
             colorSlice = '#'+Math.floor(Math.random()*16777215).toString(16);

             
         }
        
        formatted.push({value: poll.choices[i].votes,label: poll.choices[i].category,color: colorSlice});
    }
    return formatted;
}
function displayChart (poll, res){
                var display = formatPoll(poll)
                
                
                //check if poll is empty for special case
                var empty = true;
                for (var i=0; i<display.length; i++){
                    if (display[i] >0){
                        empty = false;
                    }
                }
                
                
                //add chart.js data into body
                if (empty){
                    var data = {
                        body: '<p>No results to display</p><p>Get voting already!</p>',
                        chartData: " "
                    }
                }else{
                    var data = {
                        body: '<h3>'+ poll.question + '</h3><br><canvas id="myChart" width="400" height="400"></canvas>',
                        chartData: 'var data =' + JSON.stringify(display) + '; var ctx = document.getElementById("myChart").getContext("2d"); var myPieChart = new Chart(ctx).Pie(data);'
                    }
                }
                
                
                //handle bars start
                
                fs.readFile('public/poll.html', 'utf-8', function(error, source){
               // handlebars.registerHelper('body')
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                }); 

}