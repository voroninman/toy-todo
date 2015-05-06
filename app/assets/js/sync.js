'use strict';

var actionCreator = require('./actions/actionCreator');
var ajaxCall = require('./lib/utils').ajaxCall;

actionCreator.subscribe('checkItem', function(id, isDone) {
  ajaxCall('patch', '/todo/' + id, { done: isDone });
});

actionCreator.subscribe('addItem', function(text) {
  ajaxCall('post', '/todo', { text: text });
});

actionCreator.subscribe('markAllDone', function () {
  ajaxCall('patch', '/todo', { done: true });
});
