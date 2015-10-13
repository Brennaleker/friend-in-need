var knex = require('../db/knexfile.js');
var Bookshelf = require('bookshelf')(knex);

var Item = Bookshelf.Model.extend({
    tableName: 'items',
    user: function () {
        return this.belongsTo(Project, project_id);
    }
});

module.exports = Item;
