var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    Donor = require('../models/donor.js'),
    Donors = require('../collections/donors.js')

module.exports.controller = function(app, router) {
  // fetch all Donors
  router.route('/donors')
  .get(function (req, res) {
    Donors.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a donor
  .post(function (req, res) {
    Donor.forge({
    })
    .save()
    .then(function (donor) {
      res.json({error: false, data: {id: donor.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch donor
  router.route('/donors/:id')
  .get(function (req, res) {
    Donor.forge({id: req.params.id})
    .fetch()
    .then(function (donor) {
      if (!donor) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: donor.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update donor details
  .put(function (req, res) {
    Donor.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (donor) {
      donor.save({
      })
      .then(function () {
        res.json({error: false, data: {message: 'Donor details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a donor
  .delete(function (req, res) {
    Donor.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (donor) {
      donor.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Donor successfully deleted'}});
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
