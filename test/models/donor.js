var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect;
chai.use(require('chai-bookshelf'));

describe('Donor model', function() {
  var Donor,
      Gift
  ;

  beforeEach(function() {
    Gift = Bookshelf.Model.extend({
      tableName: 'gifts'
    });
    console.log(Gift);

    Donor = Bookshelf.Model.extend({
      things: function() {
        return this.hasMany(Gift);
      }
    });
  });

  describe('Relationships', function() {
    it('has many gifts', function() {
      expect(Donor).to.haveMany(Gift);
    })
  });
});
