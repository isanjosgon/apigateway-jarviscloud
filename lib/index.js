// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const restify = require('restify');
const config = require('../package.json');
const routes = require('./routes');

let api = restify.createServer({
  name: config.name,
  version: config.version
});
api.use(restify.acceptParser(api.acceptable));
api.use(restify.queryParser());
api.use(restify.bodyParser());

api.get('/',routes.pong);
api.get('/weather',routes.indexes);
api.get('/currency',routes.featured);

api.listen(process.env.PORT || 5001,function () {
  console.log(config.name + ' listening on port ' + api.address().port);
});
