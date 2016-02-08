// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const _ = require('lodash');
const request = require('superagent');
const cache = require('./cache');
const key = _.template('weather:<%= lat %>:<%= lon %>:');
const config = require('../package.json');

class Weather
{
  constructor (params) {
    this.lat = params.lat;
    this.lon = params.lon;
    this.forecast = params.forecast;
  }
  validate () {
    let self = this;
    return new Promise (function (resolve,reject) {
      if (!self.lat || !self.lon) {
        return reject('Malformed query params syntax',400);
      }
      resolve();
    });
  }
  fetch () {
    let self = this;
    return new Promise (function (resolve,reject) {
      request
        .get(process.env.WEATHER_ADDRESS + '/forecast/' + self.lat + '/' + self.lon)
        .end(function (err,res) {
          if (err) {
            return recovery(resolve,reject);
          }
          resolve(res.body);
          write(res.body);
        });
    });
  }
  format (res) {
    let self = this;
    return new Promise (function (resolve,reject) {
      resolve({
        version:config.version,
        lat:self.lat,
        lon:self.lon,
        weather:res
      });
    });
  }
  write (data) {
    cache.set(key({ lat:this.lat,lon:this.lon }),data);
  }
  recovery (resolve,reject) {
    cache.get(key({ lat:this.lat,lon:this.lon }),function (err,res) {
      if (err || !res) {
        return reject('Impossible connect to weather service.');
      }
      resolve(res);
    });
  }
}

module.exports = Weather;
