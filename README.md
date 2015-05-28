Heroku People
===

Lists people from the apps you have access to on heroku.

## Listing people

### Usage

1. use [heroku toolbelt](https://toolbelt.heroku.com/) to login to your heroku account
2. clone this repo
3. `npm install`
4. execute `$ node list-people.js` to list all users and apps

### Example output

```
user1@gmail.com: herokuapp1,herokuapp2
user2@gmail.com: herokuapp2
user3@gmail.com: herokuapp1,herokuapp2,herokuapp3
```

## Removing people

### Usage

1. use [heroku toolbelt](https://toolbelt.heroku.com/) to login to your heroku account
2. clone this repo
3. `npm install`
4. execute `$ node remove-people.js person@email.com` to remove person from all apps or
`$ node remove-people.js person@email.com app-.*` to remove person from all apps that matches the regex `app-.*`



### Example output

```
person was not removed from app: herokuapp1
person was not removed from app: herokuapp2
person was removed from app: herokuapp3
```

## Adding people

### Usage

1. use [heroku toolbelt](https://toolbelt.heroku.com/) to login to your heroku account
2. clone this repo
3. `npm install`
4. execute `$ node add-people.js person@email.com` to add person to all apps or
`$ node add-people.js person@email.com app-.*` to add person to all apps that matches the regex `app-.*`


### Example output

```
person was not added to app: herokuapp1
person was not added to app: herokuapp2
person was added to app: herokuapp3
```

## List app based on config string

This is useful to find an app based on the database name only present in the environment variables, for example

```
$ node list-envvars.js heroku_app33681234
```

### Example output

```
Regex being used:
/heroku_app33681234/
----
app: app-name-example
=== app-name-example Config Vars
MONGOLAB_URI:               mongodb://heroku_app33681234:sarkkarta@ds035664-a0.mongolab.com:12223/heroku_app33681234
NEW_RELIC_LICENSE_KEY:      12424isa017387b0ac2221acf887a8d2921e99f320
NEW_RELIC_LOG:              stdout
NEW_RELIC_LOG_LEVEL:        error
PAPERTRAIL_API_TOKEN:       12321mo124
-----
done.
```


## Error: spawn EMFILE

If you ever receive a `Error: spawn EMFILE` error, Increase your `ulimit`.

```
$ ulimit -S -n 2048
```

Reference: https://github.com/sindresorhus/gulp-imagemin/issues/10#issuecomment-35088803
