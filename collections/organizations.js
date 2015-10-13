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
var Organization = require("../models/organization.js");

var Bookshelf = require('bookshelf')(knex);

var Organizations = Bookshelf.Collection.extend({
  model: Organization
});


module.exports = Organizations;
