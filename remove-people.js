var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');

var listapps = require('./lib/apps');
var people = require('./lib/people');

var person;
var app_match = /.*/;
// http://stackoverflow.com/a/5767589/429521
var args = process.argv.slice(2);

if (args && args.length > 1) {
  app_match = new RegExp(args[1]);
}
if (args && args.length > 0) {
  person = args[0];
} else {
  console.log("You need to provide an email to be removed from all apps or an app regex match. ex: $ node remove-people.js bob@gmail.com app-.*");
  process.exit(1);
}

listapps(function(apps) {
  var apps_filtered = _.filter(apps, function(app) { return app_match.test(app); });
  async.each(apps_filtered, function(app, callback){
    people.remove(app, person, function(removed) {
      console.log("executed removal from app: " + app);
      callback();
    });
  }, function(err) {
    console.log("");
  });
})
