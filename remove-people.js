var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');

var listapps = require('./lib/apps');
var people = require('./lib/people');

var person;
// http://stackoverflow.com/a/5767589/429521
var args = process.argv.slice(2);
if (args && args.length > 0) {
  person = args[0];
} else {
  console.log("You need to provide an email to be removed from all apps. ex: $ node remove-people.js bob@gmail.com");
  process.exit(1);
}

listapps(function(apps) {

  async.each(apps, function(app, callback){
    people.remove(app, person, function(removed) {
      console.log("person was " + (removed? "" : "not ") + "removed from app: " + app);
      callback();
    });
  }, function(err) {
    console.log("");
  });
})
// listColaborators('jpu', function(people) {console.log(people); } )
