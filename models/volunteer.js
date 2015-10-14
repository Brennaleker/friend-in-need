var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    User = require('./user.js');

var Volunteer = Bookshelf.Model.extend({
    tableName: 'volunteers',
    user: function () {
       return this.belongsTo(User);
    }
});

module.exports = Volunteer;
