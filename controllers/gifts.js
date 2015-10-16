var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    Gift = require('../models/gift.js'),
    Gifts = require('../collections/gifts.js')

module.exports.controller = function(app, router) {
  // fetch all Gifts
  router.route('/gifts')
  .get(function (req, res) {
    Gifts.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a gift
  .post(function (req, res) {
    Gift.forge({
      ammount: req.body.ammount,
      status: req.body.status,
      cc_name: req.body.cc_name,
      cc_exp: req.body.cc_exp,
      cc_number: req.body.cc_number,
      cc_ccv: req.body.cc_ccv,
      cc_address_1: req.body.cc_address_1,
      cc_address_2: req.body.cc_address_2,
      cc_city: req.body.city,
      cc_state: req.body.state,
      cc_postal_code: req.body.cc_postal_code
    })
    .save()
    .then(function (gift) {
      res.json({error: false, data: {id: gift.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch gift
  router.route('/gift/:id')
  .get(function (req, res) {
    Gift.forge({id: req.params.id})
    .fetch()
    .then(function (gift) {
      if (!gift) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: gift.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update gift details
  .put(function (req, res) {
    Gift.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (gift) {
      gift.save({
        status: req.body.status || ('status'),
        ammount: req.body.ammount || ('ammount'),
        cc_name: req.body.cc_name || ('cc_name'),
        cc_number: req.body.cc_number || ('cc_number'),
        cc_exp: req.body.cc_exp || ('cc_exp'),
        cc_ccv: req.body.cc_ccv || ('cc_ccv'),
        cc_address_1: req.body.cc_address_1 || ('cc_address_1'),
        cc_address_2: req.body.cc_address_2 || ('cc_address_2'),
        cc_city: req.body.cc_city || ('cc_city'),
        cc_state: req.body.cc_state || ('cc_state'),
        cc_postal_code: req.body.cc_postal_code || ('cc_postal_code')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Gift details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a gift
  .delete(function (req, res) {
    Gift.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (gift) {
      gift.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'gift successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
  router.route('/gifts/approved')
  .get(function (req, res) {
    Gifts.forge()
    .query('where', 'status', '=', 'approved')
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
  router.route('/gifts/count')
  .get(function (req, res) {
    Gifts.forge()
    .count('id')
    .then(function(total) {
      res.json({error: false, data: total.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
}
