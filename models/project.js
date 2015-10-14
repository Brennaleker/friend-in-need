var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    Project = require('./project.js'),
    Organization = require('./organization.js');

var Project = Bookshelf.Model.extend({
    tableName: 'projects',
    organization: function () {
      return this.belongsTo(Organization);
    }
});

module.exports = Project;
