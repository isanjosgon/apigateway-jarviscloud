// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const _ = require('lodash');
const request = require('superagent');
const Cache = require('./cache');
const key = _.template('currency:<%= from %>:<%= to %>:');
const config = require('../package.json');

class Currency
{
  constructor (params) {
    this.from = params.from;
    this.to = params.to;
    this.amount = params.amount;
    this.cache = new Cache();
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
            return self.recovery(resolve,reject);
          }
          self.format(res.body,resolve);
          self.write(res.body);
        });
    });
  }
  format (res,resolve) {
    resolve({
      version:config.version,
      from:this.from,
      to:this.to,
      currency:res
    });
  }
  write (data) {
    this.cache.set(key({ from:this.from,to:this.to }),data);
  }
  recovery (resolve,reject) {
    let self = this;
    self.cache.get(key({ from:self.from,to:self.to }),function (err,res) {
      if (err || !res) {
        return reject('Impossible connect to currency service.');
      }
      self.format(res,resolve);
    });
  }
}

module.exports = Currency;
