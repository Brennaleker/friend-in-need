var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Organization = require('../../models/organization.js'),
    User = require('../../models/user.js');
chai.use(require('chai-bookshelf'));

describe('Organization Relationships', function() {
  it('belongs to a user', function() {
    expect(Organization).to.belongTo(User);
  })
});
