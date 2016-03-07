// Created by Isra San Jose Gonzalez
// @jarvis 07/03/2016

'use strict'

class Currency {
  constructor (from,to,rate) {
    this.from = from;
    this.to = to;
    this.rate = rate;
    this.amount = rate;
  }
  static validParams (from,to) {
    return !from || !to;
  }
}

module.exports = Currency;
