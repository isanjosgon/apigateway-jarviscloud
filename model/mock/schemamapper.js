// Created by Isra San Jose Gonzalez
// @jarvis 14/03/2016

'use strict'

const Schema = require('./schema');

exports.schemafromjson = function (json)
{
  return new Schema(
    json['result']['id'],
    json['result']['locale'],
    json['result']['createdAt'],
    json['result']['schema']
  );
}
