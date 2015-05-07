var React = require('react');
var TodoItem = require('./TodoItem.jsx');
var todoStore = require('../stores/todoStore');
var SortableMixin = require('sortablejs/react-sortable-mixin');
var actionCreator = require('../actions/actionCreator');

var getTodoState = function() {
  return {
    items: todoStore.getAll()
  };
}

var TodoList = React.createClass({
  mixins: [SortableMixin],
  getInitialState: function() {
    return getTodoState();
  },
  componentDidMount: function() {
    todoStore.on('change', this._onChange);
  },
  handleEnd: function(evt) {
    actionCreator.create('itemMove', evt.oldIndex, evt.newIndex);
  },
  _onChange: function() {
    this.setState(getTodoState());
  },
  render: function() {
    var items = this.state.items.slice().map(function(item, idx) {
      return <TodoItem done={item.done}
                       text={item.text}
                       key={idx}
                       id={item.id} />;
    });
    return <ul className="list" ref="list">{items}</ul>;
  }
});

module.exports = TodoList;
