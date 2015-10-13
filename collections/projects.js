var knex = require('../db/knexfile.js');
var Project = require("../models/project.js");
var Bookshelf = require('bookshelf')(knex);

var Projects = Bookshelf.Collection.extend({
  model: Project
});


module.exports = Projects;
