// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const restify = require('restify');
const config = require('../package.json');
const Response = require('./response');

class Server {
  constructor(weather,currency) {
    let api = restify.createServer({
      name: config.name,
      version: config.version
    });
    api.use(restify.acceptParser(api.acceptable));
    api.use(restify.queryParser());
    api.use(restify.bodyParser());

    api.get('/',function (req,res) {
      let response = new Response(res);
      response.pong();
    });
    api.get('/weather',function (req,res) {
      weather.execute(req.params,new Response(res));
    });

    api.listen(process.env.PORT || 5001,function () {
      console.log(config.name + ' up and ready');
    });
  }
}

module.exports = Server;
