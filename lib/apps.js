var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');

var _apps = []
var _people = {};

module.exports = function(callback) {
  var command = "heroku apps";
  var list = exec(command,
    function (error, stdout, stderr) {
      var items = _.chain((stdout || '').split('\n'))
        .filter(function(app) {
          return /^[a-zA-Z0-9].*/.exec(app) //heroku apps starts with letters and some non-app lines starts with ' ' or '=''
        })
        .map(function(app) {
          return app.split(' ')[0];
        })
        .value();
      return callback(items);
    }
  );
}
