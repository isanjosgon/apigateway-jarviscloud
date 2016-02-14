// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const request = require('superagent');

class Weather
{
  constructor (params) {
    this.lat = params.lat;
    this.lon = params.lon;
    this.forecast = params.forecast;
  }
  validate () {
    if (!this.lat || !this.lon) {
      this.error = 'Malformed query params syntax';
    }
    return this;
  }
  fetch () {
    var self = this;
    return new Promise (function (resolve,reject) {
      if (self.error) {
        return reject(self.error,400);
      }
      request
        .get(process.env.WEATHER_ADDRESS + '/forecast?latitude=' + self.lat + '&longitude=' + self.lon)
        .end(function (err,res) {
          if (err) {
            return reject('Impossible connect to weather service.');
          }
          resolve(res.body);
        });
    });
  }
}

module.exports = Weather;
