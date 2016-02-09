// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const _ = require('lodash');
const request = require('superagent');
const Cache = require('./cache');
const key = _.template('weather:<%= lat %>:<%= lon %>:');
const config = require('../package.json');

class Weather
{
  constructor (params) {
    this.lat = params.lat;
    this.lon = params.lon;
    this.forecast = params.forecast;
    this.cache = new Cache();
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
        .get(process.env.WEATHER_ADDRESS + '/forecast/' + self.lat + '/' + self.lon)
        .end(function (err,res) {
          if (err) {
            return self.recovery(resolve,reject);
          }
          resolve(self.format(res.body));
          self.save(res.body);
        });
    });
  }
  format (res) {
    return {
      version:config.version,
      lat:this.lat,
      lon:this.lon,
      weather:res
    };
  }
  save (data) {
    this.cache.set(key({ lat:this.lat,lon:this.lon }),data);
  }
  recovery (resolve,reject) {
    let self = this;
    self.cache.get(key({ lat:self.lat,lon:self.lon }),function (err,res) {
      if (err || !res) {
        return reject('Impossible connect to weather service.');
      }
      resolve(self.format(res));
    });
  }
}

module.exports = Weather;
