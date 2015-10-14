var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Donor = require('../../models/donor.js'),
    User = require('../../models/user.js');
chai.use(require('chai-bookshelf'));

describe('Donor Relationships', function() {
  it('belongs to a user', function() {
    expect(Donor).to.belongTo(User);
  })
});
