// Created by Isra San Jose Gonzalez
// @jarvis 07/02/2016

'use strict'

const Presenter = require('./presenter');
const Interactor = require('./interactor');

exports.pong = function (req,res)
{
  let presenter = new Presenter(res);
  presenter.pong();
}

exports.indexes = function (req,res)
{
  let presenter = new Presenter(res);
  let interactor = new Interactor(presenter);

  interactor.findall();
}
