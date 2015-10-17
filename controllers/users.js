var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    User = require('../models/user.js'),
    Users = require('../collections/users.js')

module.exports.controller = function(app, router) {
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
      user_name: req.body.username,
      password: req.body.password,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name
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
        user_name: req.body.name || user.get('name'),
        email: req.body.email || user.get('email'),
        password: req.body.password || user.get('password'),
        first_name: req.body.first_name || user.get('first_name'),
        last_name: req.body.last_name || user.get('last_name')
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
}
