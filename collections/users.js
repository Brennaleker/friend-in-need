var knex = require('../knexfile.js');
var User = require("../models/user.js");
var Bookshelf = require('bookshelf')(knex);

var Users = Bookshelf.Collection.extend({
  model: User
});


module.exports = Users;
