// Created by Isra San Jose Gonzalez
// @jarvis 07/03/2016

'use strict'

const Currency = require('./currency');

exports.currencyfromjson = function (json)
{
  return new Currency(
    json['from'],
    json['to'],
    json['rate']
  );
}
