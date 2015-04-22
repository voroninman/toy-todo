'use strict';

var EventMixin = {
  _event_cb_room: function(name) {
    this._event_cb = this._event_cb || {};
    this._event_cb[name] = this._event_cb[name] || [];
  },
  on: function(name, cb) {
    this._event_cb_room(name);
    this._event_cb[name].push(cb);
  },
  trigger: function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    this._event_cb_room(name);
    this._event_cb[name].forEach(function(cb) {
      cb.apply(null, args);
    });
  }
};

module.exports = EventMixin;
