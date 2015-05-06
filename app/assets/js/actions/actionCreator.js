'use strict';

var _ = require('lodash');
var EventEmitter = require('event-emitter').methods;

function ActionCreator() {}
_.extend(ActionCreator.prototype, EventEmitter, {
  subscribe: EventEmitter.on,
  create: EventEmitter.emit
});

module.exports = new ActionCreator();
