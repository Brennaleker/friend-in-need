var knex = require('../knexfile.js');
var Volunteer = require("../models/volunteer.js");
var Bookshelf = require('bookshelf')(knex);

var Volunteers = Bookshelf.Collection.extend({
  model: Volunteer
});


module.exports = Volunteers;
