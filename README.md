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
4. execute `$ node remove-people.js person@email.com` to remove person from all apps

### Example output

```
person was not removed from app: herokuapp1
person was not removed from app: herokuapp2
person was removed from app: herokuapp3
```


## Error: spawn EMFILE

If you ever receive a `Error: spawn EMFILE` error, Increase your `ulimit`.

```
$ ulimit -S -n 2048
```

Reference: https://github.com/sindresorhus/gulp-imagemin/issues/10#issuecomment-35088803
