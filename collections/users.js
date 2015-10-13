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
var User = require("../models/user.js");

var Bookshelf = require('bookshelf')(knex);

var Users = Bookshelf.Collection.extend({
  model: User
});


module.exports = Users;
