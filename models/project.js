var knex = require('../db/knexfile.js');
var Bookshelf = require('bookshelf')(knex);

var Project = Bookshelf.Model.extend({
    tableName: 'projects',
    user: function () {
        return this.belongsTo(Organization, organization_id);
    }
});

module.exports = Project;
