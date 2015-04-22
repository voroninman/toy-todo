var $ = require('jquery');

var updateStateItem = function(state, id, item) {
  var _state = state.get();
  var idx;

  for (var i=0, l=_state.todoItems.length; i < l; i++) {
    if (_state.todoItems[i].id == id) {
      idx = i;
      break;
    }
  }
  _state.todoItems[idx] = item;
  state.set(_state);
  state.trigger('change', item);
  return item;
};

var createStateItem = function(state, item) {
  var tmp_id = Math.random().toString(36).substring(2, 7);
  var _state = state.get();

  $.extend(item, { id: tmp_id });
  _state.todoItems.push(item);
  state.set(_state);
  state.trigger('add', tmp_id, item);
  return item;
};

module.exports = {
  updateStateItem: updateStateItem,
  createStateItem: createStateItem
};
