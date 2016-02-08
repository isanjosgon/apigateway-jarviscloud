// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

let redis;
if (process.env.REDISTOGO_URL) {
  let rtg = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port,rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]);
} else {
  redis = require('redis').createClient();
}

class Cache
{
  constructor () {

  }
  set (key,data,callback) {
    let multi = redis.multi();
    multi.set(key,data,JSON.stringify(data));
    multi.expire(key,24 * 3600);
    multi.exec(callback);
  }
  get (key,callback)
  {
    redis.get(key,function (err,res) {
      if (err) {
        return callback(err);
      }
      callback(err,JSON.parse(res));
    });
  }
}

module.exports = Cache;
