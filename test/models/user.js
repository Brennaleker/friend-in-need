var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Donor = require('../../models/donor.js'),
    Organization = require('../../models/donor.js'),
    Volunteer = require('../../models/donor.js'),
    User = require('../../models/user.js');
chai.use(require('chai-bookshelf'));

describe('User Relationships', function() {
  it('has one donor', function() {
    expect(User).to.haveOne(Donor);
  })
  it('has one organization', function() {
    expect(User).to.haveOne(Organization);
  }),
  it('has one volunteer', function() {
    expect(User).to.haveOne(Volunteer);
  })
});
