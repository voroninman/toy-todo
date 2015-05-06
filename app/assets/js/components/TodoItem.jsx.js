var React = require('react');
var todoStore = require('../stores/todoStore');
var actionCreator = require('../actions/actionCreator');
var _ = require('lodash');


var TodoItem = React.createClass({
  _onCheck: function() {
    actionCreator.create('checkItem', this.props.id, ! this.props.done);
  },
  render: function() {
    var className = this.props.done ? 'done' : '';
    return (
      <li className={className}>
        <label>
          <input type="checkbox" checked={this.props.done}
            onChange={this._onCheck} />
          {this.props.text}
        </label>
      </li>
    );
  }
});

module.exports = TodoItem;
