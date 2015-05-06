var React = require('react');
var todoStore = require('../stores/todoStore');
var actionCreator = require('../actions/actionCreator');


function getTodoState() {
  return {
    items: todoStore.getAll()
  };
}

var Footer = React.createClass({
  getInitialState: function() {
    return getTodoState();
  },
  componentDidMount: function() {
    todoStore.on('change', this._onChange);
  },
  _onChange: function() {
    this.setState(getTodoState());
  },
  onClickMarkAllDone: function(e) {
    e.preventDefault();
    actionCreator.create('markAllDone');
  },
  render: function() {
    var count = this.state.items.filter(function(item) {
      return ! item.done;
    }).length;
    return (
      <footer>
        <p>{count} items left</p>
        <a href="" onClick={this.onClickMarkAllDone}>Mark all as complete</a>
      </footer>
    );
  }
});

module.exports = Footer;
