'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   }
});

var Poll = new Schema({
    question: String,
    choices: [{ category: String, votes: Number }],
    id: String
});

module.exports = mongoose.model('User', User);
