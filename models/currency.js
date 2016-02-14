// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const request = require('superagent');

class Currency
{
  constructor (params) {
    this.from = params.from;
    this.to = params.to;
    this.amount = params.amount;
  }
  validate () {
    if (!this.from || !this.to) {
      this.error = 'Malformed query params syntax';
    }
    return this;
  }
  fetch () {
    let self = this;
    return new Promise (function (resolve,reject) {
      if (self.error) {
        return reject(self.error,400);
      }
      request
        .get(process.env.CURRENCY_ADDRESS + '/' + self.from + '/' + self.to)
        .end(function (err,res) {
          if (err) {
            return reject('Impossible connect to currency service.');
          }
          resolve(res.body);
        });
    });
  }
}

module.exports = Currency;
