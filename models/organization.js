require('./user.js');
var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex);

var Organization = Bookshelf.Model.extend({
    tableName: 'organizations',
    user: function () {
      return this.belongsTo(User, 'user_id');
    }
});

module.exports = Organization;
