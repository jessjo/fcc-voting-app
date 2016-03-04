'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Poll = new Schema({
    question: String,
    choices: [{ category: String, voters: [String]}],
    id: Number,
    creator: String
});

module.exports = mongoose.model('Poll', Poll);
