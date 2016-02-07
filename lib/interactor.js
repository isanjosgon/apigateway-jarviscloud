// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const Weather = require('../models/weather');
const Currency = require('../models/weather');

class Interactor
{
  constructor (presenter) {
    this.presenter = presenter;
  }
  weather (name) {
    if (!name) {
      return this.presenter.ko('Name index not specified.');
    }
    let self = this;
    console.log('---');
    barsclient.findall(function (err,list) {
      if (err) {
        return self.presenter.ko('Bar host unavailable.',500);
      }
      let index = new Index(name);
      index
        .new(list)
        .then(function () {
          console.log('---');
          self.presenter.ok('index:' + name + ' was successfully created.',201);
        })
        .catch(function (err) {
          console.log(err);
          console.log('---');
          self.presenter.ko('Impossible create index:' + name,500);
        });
    });
  }
}

module.exports = Interactor;
