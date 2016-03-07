// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

class Response
{
  constructor (response) {
    this.response = response;
  }
  ok (res,status) {
    this.response.status(status || 200);
    this.response.send({ result:res });
  }
  ko (err,status) {
    this.response.status(status || 500);
    this.response.send({ error:err });
  }
  pong () {
    this.response.status(200);
    this.response.send({ answer:'pong!' });
  }
}

module.exports = Response;
