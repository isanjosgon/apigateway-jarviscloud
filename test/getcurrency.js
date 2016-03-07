// Created by Isra San Jose Gonzalez
// @jarvis 07/03/2016

'use strict'

const should = require('should');
const GetCurrencyUseCase = require('../usecase/getcurrency');

class CurrencyRepoTest {
  constructor (fail) {
    this.fail = fail;
  }
  findbyFromTo (from,to) {
    var self = this;
    return new Promise(function (resolve,reject) {
      if (self.fail) {
        return reject('forced error!');
      }
      resolve({"from":"EUR","to":"USD","rate":0.13,"amount":0.13});
    });
  }
}

describe('getCurrencyUseCase',function () {

  it('should respond syntax error',function (done) {
    let getCurrencyUseCase = new GetCurrencyUseCase(new CurrencyRepoTest());
    getCurrencyUseCase.execute({},{
      ko : (err,status) => {
        (err).should.be.exactly('Malformed query params syntax');
        (status).should.be.exactly(400).and.be.a.Number();
        done();
      }
    });
  });

  it('should respond connect error',function (done) {
    let getCurrencyUseCase = new GetCurrencyUseCase(new CurrencyRepoTest('force connect error'));
    getCurrencyUseCase.execute({ from:'EUR',to:'USD',amount:2 },{
      ko : (err) => {
        (err).should.be.exactly('Impossible connect to currency service');
        done();
      }
    });
  });

  it('should respond a Currency object',function (done) {
    let getCurrencyUseCase = new GetCurrencyUseCase(new CurrencyRepoTest());
    getCurrencyUseCase.execute({ from:'EUR',to:'USD',amount:2 },{
      ok : (res) => {
        (res).should.have.property('from').which.is.a.String();
        (res).should.have.property('to').which.is.a.String();
        (res).should.have.property('rate').which.is.a.Number();
        (res).should.have.property('amount').which.is.a.Number();
        done();
      }
    });
  });

  it('should respond Currency object with amount of 2 * rate',function (done) {
    let getCurrencyUseCase = new GetCurrencyUseCase(new CurrencyRepoTest());
    getCurrencyUseCase.execute({ from:'EUR',to:'USD',amount:2 },{
      ok : (res) => {
        (res).should.have.property('amount').which.is.a.Number();
        (res.amount).should.be.exactly(2 * 0.13);
        done();
      }
    });
  });

});
