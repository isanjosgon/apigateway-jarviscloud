// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

class Forecast {
  constructor (datetime,weather,weatherdescription,tempday,tempmax,tempmin,tempnight,tempevening,tempmorning,pressure,humidity,windspeed,winddirection,clouds) {
    this.datetime = datetime;
    this.weather = {
      main: weather,
      description: weatherdescription,
      cloud: clouds
    };
    this.temp = {
      day: tempday,
      max: tempmax,
      min: tempmin,
      night: tempnight,
      evening: tempevening,
      morning: tempmorning
    };
    this.pressure = pressure;
    this.humidity = humidity;
    this.wind = {
      speed: windspeed,
      direction: winddirection
    };
  }
}

module.exports = Forecast;
