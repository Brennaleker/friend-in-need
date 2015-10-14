var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    Project = require('../models/project.js'),
    Projects = require('../collections/projects.js')

module.exports.controller = function(app, router) {
  // fetch all Projects
  router.route('/projects')
  .get(function (req, res) {
    Projects.forge()
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
    Project.forge({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    })
    .save()
    .then(function (project) {
      res.json({error: false, data: {id: project.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch project
  router.route('/projects/:id')
  .get(function (req, res) {
    Project.forge({id: req.params.id})
    .fetch()
    .then(function (project) {
      if (!project) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: project.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update project details
  .put(function (req, res) {
    Project.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (project) {
      project.save({
        title: req.body.title || ('title'),
        description: req.body.description || ('description'),
        status: req.body.status || ('status')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Project details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a project
  .delete(function (req, res) {
    Project.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (project) {
      volunteer.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Project successfully deleted'}});
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
