var knex = require('../knexfile.js');
var Bookshelf = require('bookshelf')(knex);

var Donor = Bookshelf.Model.extend({
    tableName: 'donors',
    user: function () {
        return this.belongsTo(User, user_id);
    }
});

module.exports = Donor;
