require('./user.js');
var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex)

var Donor = Bookshelf.Model.extend({
    tableName: 'donors',
    user: function () {
      return this.belongsTo(User);
    }
});

module.exports = Donor;
