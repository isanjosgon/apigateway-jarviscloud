// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const _ = require('lodash');
const config = require('../package.json');
const Weather = require('../models/weather');
const Currency = require('../models/currency');
const Cache = require('../models/cache');
const weatherkey = _.template('weather:<%= lat %>:<%= lon %>:');
const currencykey = _.template('currency:<%= from %>:<%= to %>:');

class Interactor
{
  constructor (request,presenter) {
    this.presenter = presenter;
    this.params = request.query;
    this.cache = new Cache();
  }
  fetchweather () {
    let self = this;
    new Weather(self.params)
      .validate()
      .fetch()
      .then(function (res) {
        self.presenter.ok({
          version:config.version,
          lat:self.params.lat,
          lon:self.params.lon,
          weather:res
        });
        self.cache.write(weatherkey({ lat:self.params.lat,lon:self.params.lon }),res);
      })
      .catch(function (err,status) {
        if (status && status == 400) {
          return self.presenter.ko(err,status);
        }
        self.cache.read(weatherkey({ lat:self.params.lat,lon:self.params.lon }),function (err,res) {
          if (err || !res) {
            return self.presenter.ko('Impossible connect to weather service.');
          }
          self.presenter.ok({
            version:config.version,
            lat:self.params.lat,
            lon:self.params.lon,
            weather:res
          });
      });
    });
  }
  fetchcurrency () {
    let self = this;
    new Currency(self.params)
      .validate()
      .fetch()
      .then(function (res) {
        self.presenter.ok(res);
      })
      .catch(function (err,status) {
        self.presenter.ko(err,status);
      });
  }
}

module.exports = Interactor;
