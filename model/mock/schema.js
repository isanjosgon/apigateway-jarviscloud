// Created by Isra San Jose Gonzalez
// @jarvis 14/03/2016

'use strict'

const _ = require('lodash');

class Schema {
  constructor (id,locale,createdAt,schema) {
    this.id = id;
    this.locale = locale;
    this.createdAt = createdAt;
    this.schema = schema;
  }
  static validParams (schema) {
    return !schema && _.isObject(schema);
  }
}

module.exports = Schema;
