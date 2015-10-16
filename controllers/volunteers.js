var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    Volunteer = require('../models/volunteer.js'),
    Volunteers = require('../collections/volunteers.js')

module.exports.controller = function(app, router) {
  // fetch all Volunteers
  router.route('/volunteers')
  .get(function (req, res) {
    Volunteers.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a volunteer
  .post(function (req, res) {
    Volunteer.forge({
      role: req.body.role,
      approved: req.body.approved,
      bio: req.body.bio
    })
    .save()
    .then(function (volunteer) {
      res.json({error: false, data: {id: volunteer.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch volunteer
  router.route('/volunteer/:id')
  .get(function (req, res) {
    Volunteer.forge({id: req.params.id})
    .fetch()
    .then(function (volunteer) {
      if (!volunteer) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: volunteer.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update volunteer details
  .put(function (req, res) {
    Volunteer.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (volunteer) {
      volunteer.save({
        bio: req.body.bio || ('bio'),
        role: req.body.role || ('role'),
        approve: req.body.approve || ('approve')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Volunteer details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a volunteer
  .delete(function (req, res) {
    Volunteer.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (volunteer) {
      volunteer.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Volunteer successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
  // fetch all Volunteers that are in status pending
  router.route('/volunteers/pending')
  .get(function (req, res) {
    Volunteers.forge()
    .query('where', 'approved', '=', 'pending')
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
}
