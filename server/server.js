var express = require('express');
var middleware = require('./config/middleware');
require('./config/db');
// var bcrypt = require('bcrypt-nodejs');

var port = process.env.PORT || 3000;

var app = express();

middleware(app);

// only execute if server.js was the root process rather than being required by other module,
// for example, for access in test suite.
// if (!module.parent) {
  app.listen(port);
  console.log('Server now listening on port ' + port);
// }

module.exports = app;

