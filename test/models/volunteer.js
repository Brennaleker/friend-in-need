var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Volunteer = require('../../models/volunteer.js'),
    User = require('../../models/user.js');
chai.use(require('chai-bookshelf'));

describe('Volunteer Relationships', function() {
  it('belongs to a user', function() {
    expect(Volunteer).to.belongTo(User);
  })
});
