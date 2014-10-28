var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');


var people = {};

people.list = function(app, callback) {
  var command = util.format('heroku apps:info --app %s', app);
  var list = exec(command,
    function (error, stdout, stderr) {
      var collaborators = [];
      var info = stdout;
      var regex = /.*Collaborators:([\s\S]*?)(Dynos|Git URL)/i;

      var match = regex.exec(info);
      if (match) {
        collaborators = _.chain(match[1].split('\n'))
          .compact()
          .map(function(person) {
            return person.trim();
          })
          .value();
      }
      callback(collaborators);
    }
  );
}

people.remove = function(app, person, callback) {
  var command = util.format('heroku sharing:remove %s --app %s', person, app);
  var list = exec(command,
    function (error, stdout, stderr) {
      var info = stdout;
      var match_ok = /done/i.exec(info);
      var removed = false;

      if (match_ok) {
        removed = true;
      }
      return callback(removed);
    }
  );
}

module.exports = people;
