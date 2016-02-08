// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const Weather = require('../models/weather');
const Currency = require('../models/currency');

class Interactor
{
  constructor (request,presenter) {
    this.presenter = presenter;
    this.weathers = new Weather(request.query);
    this.currencys = new Currency(request.query);
  }
  fetchweather () {
    let self = this;
    self.weathers
      .validate()
      .fetch()
      .format()
      .then(self.presenter.ok)
      .catch(self.presenter.ko);
  }
  fetchcurrency () {
    let self = this;
    self.currencys
      .validate()
      .fetch()
      .format()
      .then(self.presenter.ok)
      .catch(self.presenter.ko);
  }
}

module.exports = Interactor;
