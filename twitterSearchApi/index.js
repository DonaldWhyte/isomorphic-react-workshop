'use strict';

require('babel-core/register')({});
require('babel-polyfill');

let app = require('./app').default;

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
