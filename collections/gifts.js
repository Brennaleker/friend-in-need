var knex = require('../db/knexfile.js');
var Gift = require("../models/gift.js");
var Bookshelf = require('bookshelf')(knex);

var Gifts = Bookshelf.Collection.extend({
  model: Gift
});


module.exports = Gifts;
