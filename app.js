var knex = require('./db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
// var User = require("./models/user.js");
// var Users = require("./collections/users.js");
    //users = require('./controllers/users.js')
    Volunteer = require('./models/volunteer.js'),
    Volunteers = require('./collections/volunteers.js'),
    Donor = require('./models/donor.js'),
    Donors = require('./collections/donors.js'),
    Organization = require('./models/organization.js'),
    Organizations = require('./collections/organizations.js'),
    Item = require('./models/item.js'),
    Items = require('./collections/items.js'),
    Project = require('./models/project.js'),
    Projects = require('./collections/projects.js'),
    Gift = require('./models/gift.js'),
    Gifts = require('./collections/gifts.js'),
    bodyParser = require('body-parser'),
    _ = require('lodash'),
    controllerPath = ('./controllers/'),
    router = express.Router();

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// dynamically include routes via controllers
fs.readdirSync(controllerPath).forEach(function (file) {
  if(file.substr(-3) == '.js') {
    var route = require(controllerPath + file);
    route.controller(app, router);
  }
});

app.use('/', router);

app.listen(3000, function() {
  console.log("✔ Express server listening on port %d in %s mode", 3000, app.get('env'));
});
