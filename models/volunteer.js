require('./user.js');
var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex);

var Volunteer = Bookshelf.Model.extend({
    tableName: 'volunteers',
    user: function () {
       return this.belongsTo(User);
    }
});

module.exports = Volunteer;
