// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const _ = require('lodash');
const Weather = require('./weather');

exports.weatherfromjson = function (json,parser)
{
  return new Weather(
    json['city']['coord']['lat'],
    json['city']['coord']['lon'],
    json['city']['name'],
    json['city']['country'],
    _.map(json['list'],parser.forecastfromjson)
  );
}
