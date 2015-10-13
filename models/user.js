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

var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
    tableName: 'users',
});


module.exports = User;
