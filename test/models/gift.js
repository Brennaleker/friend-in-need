var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Donor = require('../../models/donor.js'),
    Gift = require('../../models/gift.js');
chai.use(require('chai-bookshelf'));

describe('Gift Relationships', function() {
  it('belongs to a donor', function() {
    expect(Gift).to.belongTo(Donor);
  })
});
