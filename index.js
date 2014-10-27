var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');

var _apps = []
var _people = {};

var listapps = function(callback) {
  var command = "heroku apps";
  var list = exec(command,
    function (error, stdout, stderr) {
      var items = _.filter((stdout || '').split('\n'), function(app) {
        return /^[a-zA-Z0-9].*/.exec(app) //heroku apps starts with letters and some non-app lines starts with ' ' or '=''
      });
      callback(items);
    }
  );
}


var listColaborators = function(app, callback) {
  var command = util.format('heroku apps:info --app %s', app);
  var list = exec(command,
    function (error, stdout, stderr) {
      var collaborators = [];
      var info = stdout;
      var regex = /.*Collaborators:([\s\S]*?)(Dynos|Git URL)/i

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

listapps(function(apps) {

  async.each(apps, function(app, callback){
    listColaborators(app, function(collaborators) {
      _apps.push({
        app: app,
        people: collaborators
      });
      _.each(collaborators, function(person) {
        if (!_people[person]) {
          _people[person] = []
        }
        _people[person].push(app);
      });
      callback();
    });
  }, function(err) {
    _.forOwn(_people, function(apps, person) { console.log(person + ': ' + apps.join(',')); });
  });
})
// listColaborators('jpu', function(people) {console.log(people); } )
