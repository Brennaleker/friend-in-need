var knex = require('./db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
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

app.listen(3001, function() {
  console.log("✔ Express server listening on port %d in %s mode", 3001, app.get('env'));
});
