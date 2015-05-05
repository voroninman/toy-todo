'use strict';

var $ = require('jquery');
var State = require('./lib/state');
var utils = require('./lib/utils');
var View = require('./view');

var view = new View();
var state = new State();

state.on('set', function(state) {
  view.render(state.todoItems);
});
state.on('change', function(item) {
  $.ajax({
    url: '/todo/' + item.id,
    type: 'put',
    data: JSON.stringify(item),
    contentType : 'application/json',
    dataType: 'json'
  })
  .fail(function() {
    throw new Error('The server went crazy.');
  });
});
state.on('add', function(tmp_id, item) {
  $.ajax({
    url: '/todo',
    type: 'post',
    data: JSON.stringify(item),
    contentType : 'application/json',
    dataType: 'json'
  })
  .done(function(savedItem) {
    utils.updateStateItem(state, tmp_id, savedItem);
  })
  .fail(function() {
    throw new Error('The server went crazy.');
  });
});
state.on('patch', function(patch) {
  $.ajax({
    url: '/todo',
    type: 'patch',
    data: JSON.stringify(patch),
    contentType : 'application/json',
    dataType: 'json'
  })
  .fail(function() {
    throw new Error('The server went crazy.');
  });
});


state.set(window.state);

view.on('add', function(item) {
  utils.createStateItem(state, item);
});
view.on('change', function(item) {
  utils.updateStateItem(state, item.id, item);
});
view.on('markAllDone', function() {
  utils.markAllDone(state);
});
