var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        user     : 'Brenna',
        password : null,
        database : 'shelter_helper',
        charset  : 'utf8'
  }
});

var _ = require('lodash');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Bookshelf = require('bookshelf')(knex);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// application routing
var router = express.Router();

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ------------Models-----------------

// User model
var User = Bookshelf.Model.extend({
    tableName: 'users'
});
// Donor model
var Donor = Bookshelf.Model.extend({
    tableName: 'donors',
    user: function () {
        return this.belongsTo(User);
    }
});
// Organization model
var Organization = Bookshelf.Model.extend({
    tableName: 'categories',
    user: function () {
       return this.belongsTo(User);
    }
});
// Volunteer model
var Volunteer = Bookshelf.Model.extend({
    tableName: 'Volunteer',
    user: function () {
       return this.belongsTo(User);
    }
});

// collections
var Users = Bookshelf.Collection.extend({
  model: User
});
var Donors = Bookshelf.Collection.extend({
  model: Donor
});
var Organizations = Bookshelf.Collection.extend({
  model: Organization
});
var Volunteers = Bookshelf.Collection.extend({
  model: Volunteer
});

// ---------------User API calls------------------------
// fetch all Users
router.route('/users')
.get(function (req, res) {
  Users.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})
// create a user
.post(function (req, res) {
  User.forge({
    name: req.body.name,
    email: req.body.email
  })
  .save()
  .then(function (user) {
    res.json({error: false, data: {id: user.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch user
router.route('/users/:id')
  .get(function (req, res) {
    User.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: user.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.save({
        name: req.body.name || user.get('name'),
        email: req.body.email || user.get('email')
      })
      .then(function () {
        res.json({error: false, data: {message: 'User details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a user
  .delete(function (req, res) {
    User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'User successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
