var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Organization = require('../../models/organization.js'),
    Project = require('../../models/project.js');
chai.use(require('chai-bookshelf'));

describe('Project Relationships', function() {
  it('belongs to an organization', function() {
    expect(Project).to.belongTo(Organization);
  })
});
