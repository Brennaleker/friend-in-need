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
var Donor = require("../models/donor.js");

var Bookshelf = require('bookshelf')(knex);

var Donors = Bookshelf.Collection.extend({
  model: Donor
});


module.exports = Donors;
