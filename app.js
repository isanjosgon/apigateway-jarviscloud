// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const env = require('node-env-file');
env(__dirname + '/.env');

const Server = require('./webservice/server');
const GetWeatherUseCase = require('./usecase/getweather');
const WeatherMapper = require('./model/weather/weathermapper');
const ForecastMapper = require('./model/weather/forecastmapper');
const WeatherRepo = require('./model/weather/weatherrepository');

let weatherrepo = new WeatherRepo(WeatherMapper,ForecastMapper);
let getWeatherUseCase = new GetWeatherUseCase(weatherrepo);

let webservice = new Server(getWeatherUseCase);
