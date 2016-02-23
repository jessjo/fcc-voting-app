'use strict';

//For creating polls

module.exports = function (app) {
app.route('/create')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/public/create.html');
});

//user visits poll creation page

};