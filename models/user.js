require('./donor.js');
var knex = require('../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    Organization = require('./organization.js'),
    Volunteer = require('./volunteer.js');

var User = Bookshelf.Model.extend({
    tableName: 'users',
    donor: function(){
      return this.hasOne(Donor);
    },
    volunteer: function(){
      return this.hasOne(Volunteer);
    },
    organization: function(){
      return this.hasOne(Organization);
    },
    project: function(){
      return this.hasMany(Project);
    }
});

module.exports = User;
