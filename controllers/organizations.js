var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    Organization = require('../models/organization.js'),
    Organizations = require('../collections/organizations.js'),
    Project = require('../models/project.js'),
    Projects = require('../collections/projects.js');

module.exports.controller = function(app, router) {
  // fetch all Organizations
  router.route('/organizations')
  .get(function (req, res) {
    Organizations.forge()
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
    Organization.forge({
      user_id: req.body.user_id,
      shipping_state_address_1: req.body.shipping_state_address_1,
      shipping_state_address_2: req.body.shipping_state_address_2,
      shipping_state_city: req.body.shipping_state_city,
      shipping_state: req.body.shipping_state,
      shipping_state_postal_code: req.body.shipping_state_postal_code,
      approval_status: req.body.approval_status,
      karma: req.body.karma
    })
    .save()
    .then(function (organiztion) {
      res.json({error: false, data: {id: organization.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch organization
  router.route('/organization/:id')
    .get(function (req, res) {
      Organization.forge({id: req.params.id})
      .fetch()
      .then(function (organization) {
        if (!organization) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: organization.toJSON()});
        }
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    // update organization details
    .put(function (req, res) {
      Organization.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (organization) {
        organization.save({
          organization_name: req.body.organization_name || organization.get('organization_name'),
          blurb: req.body.blurb || organization.get('blurb'),
          shipping_address_1: req.body.shipping_address_1 || ('shipping_address_1'),
          shipping_address_2: req.body.shipping_address_2 || ('shipping_state'),
          shipping_city: req.body.shipping_city || ('shipping_city'),
          shipping_state: req.body.shipping_state || ('shipping_state'),
          shipping_postal_code: req.body.shipping_postal_code || ('shipping_postal_code'),
          population_served: req.body.population_served || ('population_served'),
          approval_status: req.body.approval_status || ('approval_status'),
          karma: req.body.karma || ('karma')
        })

        .then(function () {
          res.json({error: false, data: {message: 'Organization details updated'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
  // delete an organization
  .delete(function (req, res) {
    Organization.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (organization) {
      organization.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Organization successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
  // fetch all projects belonging to an organization
  router.route('/organization/:id/projects')
  .get(function(req, res) {
    Organization.forge({id: req.params.id})
    .fetch({ withRelated: ['projects']})
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
}
