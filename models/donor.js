var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    User = require('./user.js');

var Donor = Bookshelf.Model.extend({
    tableName: 'donors',
    user: function () {
      return this.belongsTo(User);
    }
});

module.exports = Donor;
