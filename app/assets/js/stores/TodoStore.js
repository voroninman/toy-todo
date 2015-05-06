'use strict';

var _ = require('lodash');
var EventEmitter = require('event-emitter').methods;
var actionCreator = require('../actions/actionCreator');

function TodoStore() {
  this._items = [];
  actionCreator.subscribe('checkItem', this.checkItem.bind(this));
  actionCreator.subscribe('addItem', this.add.bind(this));
  actionCreator.subscribe('markAllDone', this.markAllDone.bind(this));
  actionCreator.subscribe('itemGetId', this.itemGetId.bind(this));
}

TodoStore.prototype = _.extend(EventEmitter, {
  checkItem: function(id, isDone) {
    _.extend(this._items[_.findIndex(this._items, { id: id })], { done: isDone });
    this.emit('change');
  },
  add: function(text, tmpId) {
    this._items.push({ text: text, done: false, tmpId: tmpId });
    this.emit('change');
  },
  set: function(items) {
    this._items = items;
    this.emit('change');
  },
  getAll: function() {
    return this._items;
  },
  markAllDone: function() {
    var self = this;
    _.each(this._items, function(__, idx) {
      _.extend(self._items[idx], { done: true });
    });
    this.emit('change');
  },
  itemGetId: function(tmpId, id) {
    var item = this._items[_.findIndex(this._items, { tmpId: tmpId })];
    _.extend(item, { id: id });
    delete item['tmpId'];
    this.emit('change');
  }
});

module.exports = new TodoStore();
