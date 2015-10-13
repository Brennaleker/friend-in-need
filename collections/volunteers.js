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
var Volunteer = require("../models/volunteer.js");

var Bookshelf = require('bookshelf')(knex);

var Volunteers = Bookshelf.Collection.extend({
  model: Volunteer
});


module.exports = Volunteers;
