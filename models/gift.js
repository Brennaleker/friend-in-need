var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    Donor = require('./donor.js'),
    Project = require('./project.js');

var Gift = Bookshelf.Model.extend({
    tableName: 'gifts',
    donor: function () {
      return this.belongsTo(Donor, 'donor_id');
      return this.belongsTo(Project, 'project_id');
    }
});

module.exports = Gift;
