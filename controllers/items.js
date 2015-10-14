var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    Item = require('../models/item.js'),
    Items = require('../collections/items.js')

module.exports.controller = function(app, router) {
  // fetch all Items
  router.route('/items')
  .get(function (req, res) {
    Items.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create an item
  .post(function (req, res) {
    Item.forge({
      name:  req.body.name,
      description: req.body.description,
      url: req.body.url,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.total
    })
    .save()
    .then(function (item) {
      res.json({error: false, data: {id: item.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch item
  router.route('/items/:id')
  .get(function (req, res) {
    Item.forge({id: req.params.id})
    .fetch()
    .then(function (item) {
      if (!item) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: item.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update volunteer details
  .put(function (req, res) {
    Item.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (item) {
      item.save({
        name: req.body.name || ('name'),
        vendor: req.body.vendor || ('vendor'),
        description: req.body.description || ('description'),
        url: req.body.url || ('url'),
        price: req.body.price || ('price'),
        quantity: req.body.quantity || ('quantity'),
        total: req.body.total || ('total')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Item details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a item
  .delete(function (req, res) {
    Item.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (item) {
      item.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Item successfully deleted'}});
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
