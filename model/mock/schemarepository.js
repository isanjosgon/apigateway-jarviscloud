// Created by Isra San Jose Gonzalez
// @jarvis 14/03/2016

'use strict'

const request = require('superagent');

class SchemaRepository {
  constructor(schemaparser) {
    this.parser = schemaparser;
  }
  findbyId (id) {
    var self = this;
    return new Promise(function (resolve,reject) {
      request
        .get(process.env.MOCK_ADDRESS + '/mock/' + id)
        .end(function (err,res) {
          if (err) {
            return reject(err);
          }
          resolve(self.parser.schemafromjson(res.body));
        });
    });
  }
  new (schema,locale) {
    var self = this;
    return new Promise(function (resolve,reject) {
      request
        .post(process.env.MOCK_ADDRESS + '/mock')
        .send(JSON.stringify({
          locale : locale,
          schema : schema
        }))
        .end(function (err,res) {console.log(err);
          if (err) {
            return reject(err);
          }
          resolve(self.parser.schemafromjson(res.body));
        });
    });
  }
}

module.exports = SchemaRepository;
