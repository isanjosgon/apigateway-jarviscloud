// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const _ = require('lodash');
const request = require('superagent');
const cache = require('./cache');
const key = _.template('currency:<%= from %>:<%= to %>:');

class Currency
{
  constructor (params) {
    this.from = params.from;
    this.to = params.to;
    this.amount = params.amount;
  }
  validate () {
    let self = this;
    return new Promise (function (resolve,reject) {
      if (!self.from || !self.to) {
        return reject('Malformed query params syntax',400);
      }
      resolve();
    });
  }
  fetch () {
    let self = this;
    return new Promise (function (resolve,reject) {
      request
        .get(process.env.CURRENCY_ADDRESS + '/' + self.from + '/' + self.to)
        .end(function (err,res) {
          if (err) {
            return recovery(resolve,reject);
          }
          resolve(res.body);
          write(res.body);
        });
    });
  }
  format () {

  }
  write () {

  }
  recovery () {

  }
}

module.exports = Currency;
