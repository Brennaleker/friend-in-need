var chai = require('chai'),
    knex = require('../../db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    expect = require('chai').expect,
    Item = require('../../models/item.js'),
    Project = require('../../models/project.js');
chai.use(require('chai-bookshelf'));

describe('Item Relationships', function() {
  it('belongs to a project', function() {
    expect(Item).to.belongTo(Project);
  })
});
