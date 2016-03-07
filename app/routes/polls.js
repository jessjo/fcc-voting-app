'use strict';

var mongoose = require('mongoose');
var Polls = require('../models/polls.js');
var handlebars  = require('handlebars');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app, db, passport) {

var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.route('/polls/:pollID')
  .get(function (req, res) {
        
    var loggedin, voter;
    if (req.isAuthenticated()) {
        loggedin = true;
        voter = req.user.username;
           
     } else {
        loggedin =false;
        voter = req.connection.remoteAddress;
    }
             
             
    var pollID = Number(req.params.pollID);
    if(Number.isInteger(pollID)){
        Polls.findOne({ 'id': pollID }, function (err, poll) {
             if (err) throw err;
             if(poll){
               
               console.log(poll);
               displayChart(poll,res,loggedin, voter);
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


//start adding in section to retrive vote 
app.post('/polls/:pollID',  upload.single('vote'), function (req, res) {
    //TO DO check authentication if a user has already voted. 
        var loggedin;
        var voter;
        //check if user is loggedin
        if (req.isAuthenticated()) {
                 loggedin = true;
                 voter = req.user.username;
           
        } else {
                loggedin =false;
                voter = req.connection.remoteAddress;
        }
        
        //find this poll, check if this user has voted
        
        //If it's a new category
        if (req.body.vote == 'ano'){
           //Adds a new category from logged in users
            Polls.findOneAndUpdate(
                {id:req.body.PollNum},
                {$push: {choices: {"category":req.body.ano, "voters":[voter] }} },
                {safe: true, upsert: true},
                function(err, model) {
                    console.log(err);
                }
            );
             Polls.findOne({ 'id': req.body.PollNum }, function (err, poll) {
                    if (err) throw err;
                    if(poll){
                         displayChart(poll, res, loggedin, voter);
                    }

             });
                   
         } else {
             
             //Add vote to existing category
              Polls.findOne({ 'id': req.body.PollNum }, function (err, poll) {
                    if (err) throw err;
                    if(poll){
             
                         for( var i=0; i<poll.choices.length; i++){
                   
                             if (poll.choices[i].category==req.body.vote){
  
                                    poll.choices[i].voters.push(voter);
                              
                                console.log ("vote incremented " + poll.choices[i].voters.length)
                                poll.save();
                            }
                         }
                   
               
        
                     displayChart(poll, res, loggedin, voter);
             } else {
                console.log("no result")
             }
        
        })
        
     }

});

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
        
        formatted.push({value: poll.choices[i].voters.length,label: poll.choices[i].category,color: colorSlice});
    }
    return formatted;
}
function displayChart (poll, res, loggedin, voter){
                if (poll.creator != ""){
                var display = formatPoll(poll);
                //only need to call this if they haven't already voted.
                var notVoted=true;
                for (var i=0; i<poll.choices.length; i++){
                    for (var j=0; j<poll.choices[i].voters.length; j++){
                        if (poll.choices[i].voters[j] == voter){
                            notVoted=false;
                        }
                    }
                }
                     var votingOptions =formatVoting(display,loggedin);
                //check if poll is empty for special case
                var empty = true;
                for (var i=0; i<display.length; i++){
                    if (display[i].value >0){
                        empty = false;
                    }
                }
                

                
                //add chart.js data into body
                if (empty){
                    
                    var data = {
                        body: '<p>No results to display</p><p>Get voting already!</p>',
                        chartData: 'var data =' + JSON.stringify(display) + '; var ctx = document.getElementById("myChart").getContext("2d"); var myPieChart = new Chart(ctx).Pie(data);',
                        voting: votingOptions,
                        pollNum: poll.id,
                        notdelete: true,
                        notVoted: notVoted

                    }
       
                }else{
                    var data = {
                        body: '<h3>'+ poll.question + '</h3><br><canvas id="myChart" width="400" height="400"></canvas>',
                        chartData: 'var data =' + JSON.stringify(display) + '; var ctx = document.getElementById("myChart").getContext("2d"); var myPieChart = new Chart(ctx).Pie(data);',
                        voting: votingOptions,
                        pollNum: poll.id,
                        notVoted: notVoted,
                        notdelete: true
                    }
                }
                } else {
                    data = {
                    body: '<h3>This poll has been deleted. Find <a href="/">another?</a></h3>',
                    notdelete: false 
                }
              
                //handle bars start
                }
                  console.log(data);
                fs.readFile('public/poll.html', 'utf-8', function(error, source){
               // handlebars.registerHelper('body')
                var template = handlebars.compile(source);
                var html = template(data);
                res.send(html);
           
                }); 
                


    
}
function formatVoting(display,loggedin){

  var voteStr = "<select name='vote'  onchange=" + '"if (this.value=='+ "'ano')   {this.form['ano'].style.visibility='visible'}else     {this.form['ano'].style.visibility='hidden'}"+ '">';
  for(var i=0; i<display.length; i++){
      voteStr += '<option value="' +display[i].label+'">'+display[i].label+"</option>"
  }
  if(loggedin){
      voteStr+= '<option value="ano">Add new option</other>'
  }
  voteStr+= '</select><input type="textbox" name="ano" style="visibility:hidden;"/><br/>';
  return voteStr;
}