'use strict';

var EventMixin = require('./event');
var $ = require('jquery');

var State = function() {
  this._state = null;
};
$.extend(State.prototype, EventMixin, {
  set: function(state) {
    this._state = state;
    this.trigger('set', this.get());
  },
  get: function() {
    return this._state;
  }
});

module.exports = State;
