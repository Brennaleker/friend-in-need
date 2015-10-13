var knex = require('../knexfile.js');
var Bookshelf = require('bookshelf')(knex);

var Volunteer = Bookshelf.Model.extend({
    tableName: 'volunteers',
    user: function () {
       return this.belongsTo(User, user_id);
    }
});

module.exports = Volunteer;
