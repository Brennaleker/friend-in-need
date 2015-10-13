var knex = require('../db/knexfile.js');
var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
    tableName: 'users',
});


module.exports = User;
