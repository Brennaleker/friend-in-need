var Bookshelf = require('bookshelf')(knex);

exports.model = Bookshelf.Model.extend({
      tableName: 'users',
});
