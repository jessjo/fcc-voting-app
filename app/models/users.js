
'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require(bcrypt),
SALT_WORK_FACTOR = 10;

var UserDetail = new Schema({
      username: {type: String, required: true, index: { unique: true }},
      password:  { type: String, required: true }
    }, {
      collection: 'userInfo'
    });
    
module.exports = mongoose.model('userInfo', UserDetail);