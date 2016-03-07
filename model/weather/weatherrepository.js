// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const request = require('superagent');

class WeatherRepository {
  constructor(weatherparser,forecastparser) {
    this.weatherparser = weatherparser;
    this.forecastparser = forecastparser;
  }
  findbyLatLon (lat,lon) {
    var self = this;
    return new Promise(function (resolve,reject) {
      request
        .get(process.env.WEATHER_ADDRESS + '/forecast?latitude=' + lat + '&longitude=' + lon)
        .end(function (err,res) {
          if (err) {
            return reject(err);
          }
          resolve(self.weatherparser.weatherfromjson(res.body,self.forecastparser));
        });
    });
  }
}

module.exports = WeatherRepository;
