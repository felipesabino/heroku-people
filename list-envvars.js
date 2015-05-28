var util    = require('util'),
    exec    = require('child_process').exec,
    _       = require('lodash'),
    async   = require('async');

var listapps = require('./lib/apps');
var people = require('./lib/people');

var _apps = []

var app_match = /.*/;
// http://stackoverflow.com/a/5767589/429521
var args = process.argv.slice(2);

if (args && args.length > 0) {
  app_match = new RegExp(args[0]);
}

console.log("Regex being used:");
console.log(app_match);
console.log("----");

listapps(function(apps) {

  async.each(apps, function(app, callback){
    var command = "heroku config --app " + app;
    var list = exec(command,
      function (error, stdout, stderr) {
        var info = stdout;
        var match_ok = app_match.exec(info);
        if (match_ok) {
          console.log("app: " + app);
          console.log(info)
          console.log("-----");
        }
        callback();
      });
  }, function(err) {
    console.log('done.');
  });
})
