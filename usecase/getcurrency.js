// Created by Isra San Jose Gonzalez
// @jarvis 07/03/2016

'use strict'

const Currency = require('../model/currency/currency');

class GetCurrencyUseCase {
  constructor (currencyrepo) {
    this.currencyrepo = currencyrepo;
  }
  execute (params,res) {
    let from = params.from;
    let to = params.to;
    let amount = params.amount || 1;
    if (Currency.validParams(from,to)) {
      return res.ko('Malformed query params syntax',400);
    }
    this.currencyrepo
      .findbyFromTo(from,to)
      .then(function (currency) {
        currency.amount = currency.amount * amount;
        res.ok(currency);
      })
      .catch(function (err) {
        res.ko('Impossible connect to currency service');
      });
  }
}

module.exports = GetCurrencyUseCase;
