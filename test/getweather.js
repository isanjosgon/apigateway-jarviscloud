// Created by Isra San Jose Gonzalez
// @jarvis 07/03/2016

'use strict'

const should = require('should');
const GetWeatherUseCase = require('../usecase/getweather');

class WeatherRepoTest {
  constructor (fail) {
    this.fail = fail;
  }
  findbyLatLon (lat,lon) {
    var self = this;
    return new Promise(function (resolve,reject) {
      if (self.fail) {
        return reject('forced error!');
      }
      resolve({"latitude":43.121658,"longitude":-4.72682,"city":"TreviÃ±o","country":"ES","forecast":[{"datetime":"2016-03-07","weather":{"main":"Snow","description":"snow","cloud":92},"temp":{"day":275.53,"max":275.53,"min":273.81,"night":273.89,"evening":274.12,"morning":275.34},"pressure":918.37,"humidity":99,"wind":{"speed":1.96,"direction":355}},{"datetime":"2016-03-08","weather":{"main":"Snow","description":"snow","cloud":88},"temp":{"day":276.33,"max":276.38,"min":274.27,"night":274.51,"evening":275.47,"morning":274.61},"pressure":928.48,"humidity":95,"wind":{"speed":1.39,"direction":314}},{"datetime":"2016-03-09","weather":{"main":"Snow","description":"light snow","cloud":80},"temp":{"day":276.76,"max":278.36,"min":275.59,"night":275.59,"evening":275.85,"morning":278.36},"pressure":925.54,"humidity":95,"wind":{"speed":2.77,"direction":305}},{"datetime":"2016-03-10","weather":{"main":"Snow","description":"light snow","cloud":88},"temp":{"day":277.18,"max":278.17,"min":275.49,"night":276.26,"evening":277.46,"morning":275.49},"pressure":931.25,"humidity":98,"wind":{"speed":1.36,"direction":297}},{"datetime":"2016-03-11","weather":{"main":"Snow","description":"light snow","cloud":51},"temp":{"day":278.96,"max":278.96,"min":273.19,"night":274.91,"evening":277.79,"morning":273.19},"pressure":947.5,"humidity":0,"wind":{"speed":2.9,"direction":344}}]});
    });
  }
}

describe('getWeatherUseCase',function () {

  it('should respond syntax error',function (done) {
    let getWeatherUseCase = new GetWeatherUseCase(new WeatherRepoTest());
    getWeatherUseCase.execute({},{
      ko : (err,status) => {
        (err).should.be.exactly('Malformed query params syntax');
        (status).should.be.exactly(400).and.be.a.Number();
        done();
      }
    });
  });

  it('should respond connect error',function (done) {
    let getWeatherUseCase = new GetWeatherUseCase(new WeatherRepoTest('force connect error'));
    getWeatherUseCase.execute({ lat:43.123,lon:-4.789,forecast:1 },{
      ko : (err) => {
        (err).should.be.exactly('Impossible connect to weather service');
        done();
      }
    });
  });

  it('should respond a Weather object',function (done) {
    let getWeatherUseCase = new GetWeatherUseCase(new WeatherRepoTest());
    getWeatherUseCase.execute({ lat:43.123,lon:-4.789 },{
      ok : (res) => {
        (res).should.have.property('latitude').which.is.a.Number();
        (res).should.have.property('longitude').which.is.a.Number();
        (res).should.have.property('city').which.is.a.String();
        (res).should.have.property('country').which.is.a.String();
        (res).should.have.property('forecast').which.is.a.Array();
        done();
      }
    });
  });

  it('should respond Weather object with forecast of 1 day',function (done) {
    let getWeatherUseCase = new GetWeatherUseCase(new WeatherRepoTest());
    const forecastLength = 1;
    getWeatherUseCase.execute({ lat:43.123,lon:-4.789,forecast:forecastLength },{
      ok : (res) => {
        (res).should.have.property('forecast').which.is.a.Array();
        (res.forecast).should.have.length(forecastLength);
        done();
      }
    });
  });

});
