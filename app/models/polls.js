'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Poll = new Schema({
    question: String,
    choices: [{ category: String, votes: Number }],
    id: String
});

module.exports = mongoose.model('Poll', Poll);
