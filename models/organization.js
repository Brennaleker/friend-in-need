var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    User = require('./user.js');

var Organization = Bookshelf.Model.extend({
    tableName: 'organizations',
    user: function () {
       return this.belongsTo(User);
    }
});

module.exports = Organization;
