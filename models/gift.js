var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    Donor = require('./donor.js');

var Gift = Bookshelf.Model.extend({
    tableName: 'gifts',
    donor: function () {
      return this.belongsTo(Donor);
    }
});

module.exports = Gift;
