// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

class Weather {
  constructor (lat,lon,city,country,forecast) {
    this.latitude = lat;
    this.longitude = lon;
    this.city = city;
    this.country = country;
    this.forecast = forecast;
  }
  static validParams (lat,lon) {
    return !lat || !lon;
  }
}

module.exports = Weather;
