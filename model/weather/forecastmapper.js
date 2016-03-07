// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const moment = require('moment');
const Forecast = require('./forecast');

exports.forecastfromjson = function (json)
{
  return new Forecast(
    moment(new Date(json['dt'] * 1000)).format('YYYY-MM-DD'),
    json['weather'][0]['main'],
    json['weather'][0]['description'],
    json['temp']['day'],
    json['temp']['max'],
    json['temp']['min'],
    json['temp']['night'],
    json['temp']['eve'],
    json['temp']['morn'],
    json['pressure'],
    json['humidity'],
    json['speed'],
    json['deg'],
    json['clouds']
  );
}
