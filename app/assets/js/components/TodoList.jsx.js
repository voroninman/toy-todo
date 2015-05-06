var React = require('react');
var TodoItem = require('./TodoItem.jsx');
var todoStore = require('../stores/todoStore');

function getTodoState() {
  return {
    items: todoStore.getAll()
  };
}

var TodoList = React.createClass({
  getInitialState: function() {
    return getTodoState();
  },
  componentDidMount: function() {
    todoStore.on('change', this._onChange);
  },
  _onChange: function() {
    this.setState(getTodoState());
  },
  render: function() {
    var self = this;
    var items = this.state.items.slice().reverse().map(function(item, idx) {
      return <TodoItem done={item.done}
                       text={item.text}
                       key={idx}
                       id={item.id} />;
    });
    var content = items.length ? <ul>{items}</ul> : <p>Create a new item!</p>;
    return <div className="list">{content}</div>;
  }
});

module.exports = TodoList;
