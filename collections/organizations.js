var knex = require('../knexfile.js');
var Organization = require("../models/organization.js");
var Bookshelf = require('bookshelf')(knex);

var Organizations = Bookshelf.Collection.extend({
  model: Organization
});


module.exports = Organizations;
