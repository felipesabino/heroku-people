var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');

var listapps = require('./lib/apps');
var people = require('./lib/people');

var _apps = []
var _people = {};


listapps(function(apps) {

  async.each(apps, function(app, callback){
    people.list(app, function(collaborators) {
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
