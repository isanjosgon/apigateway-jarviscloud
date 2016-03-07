// Created by Isra San Jose Gonzalez
// @jarvis 06/03/2016

'use strict'

const env = require('node-env-file');
env(__dirname + '/.env');

const Logger = require('./interface/logger');
const Server = require('./webservice/server');

const GetWeatherUseCase = require('./usecase/getweather');
const WeatherMapper = require('./model/weather/weathermapper');
const ForecastMapper = require('./model/weather/forecastmapper');
const WeatherRepo = require('./model/weather/weatherrepository');

const GetCurrencyUseCase = require('./usecase/getcurrency');
const CurrencyMapper = require('./model/currency/currencymapper');
const CurrencyRepo = require('./model/currency/currencyrepository');

let weatherrepo = new WeatherRepo(WeatherMapper,ForecastMapper);
let getWeatherUseCase = new GetWeatherUseCase(weatherrepo);

let currencyrepo = new CurrencyRepo(CurrencyMapper);
let getCurrencyUseCase = new GetCurrencyUseCase(currencyrepo);

let webservice = new Server(new Logger(),getWeatherUseCase,getCurrencyUseCase);
