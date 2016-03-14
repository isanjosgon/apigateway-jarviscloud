// Created by Isra San Jose Gonzalez
// @jarvis 14/03/2016

'use strict'

const Schema = require('../model/mock/schema');

class GetSchemaUseCase
{
  constructor (schemarepo) {
    this.schemarepo = schemarepo;
  }
  execute (params,res) {
    let id = params.id;
    this.schemarepo
      .findbyId(id)
      .then(function (fakeschema) {
        res.ok(fakeschema);
      })
      .catch(function (err) {
        res.ko('Impossible connect to mock service');
      });
  }
}

module.exports = GetSchemaUseCase;
