// Created by Isra San Jose Gonzalez
// @jarvis 14/03/2016

'use strict'

const Schema = require('../model/mock/schema');

class CreateSchemaUseCase
{
  constructor (schemarepo) {
    this.schemarepo = schemarepo;
  }
  execute (params,res) {
    let locale = params.locale || 'en';
    let schema = params.schema;
    if (Schema.validParams(schema)) {
      return res.ko('Malformed body params syntax',400);
    }
    this.schemarepo
      .new(schema,locale)
      .then(function (fakeschema) {
        res.ok(fakeschema);
      })
      .catch(function (err) {
        res.ko('Impossible connect to mock service');
      });
  }
}

module.exports = CreateSchemaUseCase;
