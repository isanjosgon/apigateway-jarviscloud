// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const _ = require('lodash');
const Weather = require('../model/weather/weather');

class GetWeatherUseCase {
  constructor (weatherrepo) {
    this.weatherrepo = weatherrepo;
  }
  execute (params,res) {
    let lat = params.lat;
    let lon = params.lon;
    let forecast = params.forecast || 15;
    if (Weather.validParams(lat,lon)) {
      return res.ko('Malformed query params syntax',400);
    }
    this.weatherrepo
      .findbyLatLon(lat,lon)
      .then(function (weather) {
        weather.forecast = weather.forecast.slice(0,forecast);
        res.ok(weather);
      })
      .catch(function (err) {
        res.ko('Impossible connect to weather service');
      });
  }
}

module.exports = GetWeatherUseCase;
