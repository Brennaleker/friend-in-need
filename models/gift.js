var knex = require('../db/knexfile.js');
var Bookshelf = require('bookshelf')(knex);

var Gift = Bookshelf.Model.extend({
    tableName: 'gifts',
    user: function () {
        return this.belongsTo(Donor, donor_id);
    }
});

module.exports = Gift;
