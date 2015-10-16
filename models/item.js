var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    Project = require('./project.js');

var Item = Bookshelf.Model.extend({
    tableName: 'items',
    project: function () {
      return this.belongsTo(Project, 'project_id');
    }
});

module.exports = Item;
