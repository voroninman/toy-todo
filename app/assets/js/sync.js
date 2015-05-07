'use strict';

var actionCreator = require('./actions/actionCreator');
var ajaxCall = require('./lib/utils').ajaxCall;

actionCreator.subscribe('checkItem', function(id, isDone) {
  ajaxCall('patch', '/todo/' + id, { done: isDone });
});

actionCreator.subscribe('addItem', function(text, tmpId) {
  ajaxCall('post', '/todo', { text: text, tmpId: tmpId }, function(item) {
    actionCreator.create('itemGetId', tmpId, item.id);
  });
});

actionCreator.subscribe('markAllDone', function() {
  ajaxCall('patch', '/todo', { done: true });
});

actionCreator.subscribe('itemMove', function(oldIndex, newIndex) {
  ajaxCall('post', '/order', { old: oldIndex, new: newIndex });
});
