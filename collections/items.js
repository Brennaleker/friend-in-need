var knex = require('../db/knexfile.js');
var Item = require("../models/item.js");
var Bookshelf = require('bookshelf')(knex);

var Items = Bookshelf.Collection.extend({
  model: Item
});


module.exports = Items;
