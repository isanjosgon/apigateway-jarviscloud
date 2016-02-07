// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const env = require('node-env-file');
env(__dirname + '/.env');

require('./api');
