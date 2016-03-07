// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

class Response
{
  constructor (response,logger) {
    this.response = response;
    this.logger = logger;
  }
  ok (res,status) {
    if (this.logger) {
      let responseStatus = status || 200;
      let responseObject = JSON.stringify(res);
      this.logger.info('response [' + responseStatus + '] : ' + responseObject);
    }
    this.response.status(status || 200);
    this.response.send({ result:res });
  }
  ko (err,status) {
    if (this.logger) {
      let responseStatus = status || 500;
      this.logger.error('response [' + responseStatus + '] : ' + err);
    }
    this.response.status(status || 500);
    this.response.send({ error:err });
  }
  pong () {
    if (this.logger) {
      this.logger.info('response [200] : pong!');
    }
    this.response.status(200);
    this.response.send({ answer:'pong!' });
  }
}

module.exports = Response;
