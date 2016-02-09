// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const Weather = require('../models/weather');
const Currency = require('../models/currency');

class Interactor
{
  constructor (request,presenter) {
    this.presenter = presenter;
    this.params = request.query;
  }
  fetchweather () {
    let self = this;
    new Weather(self.params)
      .validate()
      .fetch()
      .then(function (res) {
        self.presenter.ok(res);
      })
      .catch(function (err,status) {
        self.presenter.ko(err,status);
      });
  }
  fetchcurrency () {
    let self = this;
    new Currency(self.params)
      .validate()
      .fetch()
      .format()
      .then(self.presenter.ok)
      .catch(self.presenter.ko);
  }
}

module.exports = Interactor;
