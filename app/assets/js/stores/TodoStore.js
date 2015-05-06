'use strict';

var _ = require('lodash');
var EventEmitter = require('event-emitter').methods;
var actionCreator = require('../actions/actionCreator');

function TodoStore() {
  this._items = [];
  actionCreator.subscribe('checkItem', this.update.bind(this));
  actionCreator.subscribe('addItem', this.add.bind(this));
  actionCreator.subscribe('markAllDone', this.markAllDone.bind(this));
}

TodoStore.prototype = _.extend(EventEmitter, {
  update: function(id, isDone) {
    _.extend(this._items[_.findIndex(this._items, { id: id })], { done: isDone });
    this.emit('change');
    console.log('Updated');
  },
  add: function(text) {
    this._items.push({ id: '', text: text, done: false });
    this.emit('change');
    console.log('Added');
  },
  set: function(items) {
    this._items = items;
    this.emit('change');
  },
  getAll: function() {
    return this._items;
  },
  markAllDone: function() {
    debugger;
    var self = this;
    _.each(this._items, function(__, idx) {
      _.extend(self._items[idx], { done: true });
    });
    this.emit('change');
  }
});

module.exports = new TodoStore();
