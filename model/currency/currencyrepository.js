// Created by Isra San Jose Gonzalez
// @jarvis 07/03/2016

'use strict'

const request = require('superagent');

class CurrencyRepository {
  constructor(currencyparser) {
    this.parser = currencyparser;
  }
  findbyFromTo (from,to) {
    var self = this;
    return new Promise(function (resolve,reject) {
      request
        .get(process.env.CURRENCY_ADDRESS + '/currency?from=' + from + '&to=' + to)
        .end(function (err,res) {
          if (err) {
            return reject(err);
          }
          resolve(self.parser.currencyfromjson(res.body));
        });
    });
  }
}

module.exports = CurrencyRepository;
