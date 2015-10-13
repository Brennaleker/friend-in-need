var knex = require('../db/knexfile.js');
var Donor = require("../models/donor.js");
var Bookshelf = require('bookshelf')(knex);

var Donors = Bookshelf.Collection.extend({
  model: Donor
});


module.exports = Donors;
