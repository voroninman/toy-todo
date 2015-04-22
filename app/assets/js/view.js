'use strict';

var EventMixin = require('./lib/event');
var React = require('react');
var $ = require('jquery');

var TodoItem = React.createClass({
  _onCheck: function() {
    var attrs = $.extend(this.props, { done: ! this.props.done });
    this.props.handleUpdate(attrs);
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

var TodoList = React.createClass({
  render: function() {
    var self = this;
    var items = this.props.items.slice().reverse().map(function(item, idx) {
      return <TodoItem done={item.done} text={item.text}
        key={idx} handleUpdate={self.props.onUpdate} id={item.id}/>;
    });
    var content = items.length ? <ul>{items}</ul> : <p>Create a new item!</p>;
    return <div className="list">{content}</div>;
  }
});

var Footer = React.createClass({
  render: function() {
    var count = this.props.items.filter(function(item) {
      return ! item.done;
    }).length;
    return (
      <footer>
        <p>{count} items left</p>
        <a href="">Mark all as complete</a>
      </footer>
    );
  }
});

var View = function() {
  this._bind();
};

$.extend(View.prototype, EventMixin, {
  _bind: function() {
    var self = this;
    $('.form').on('submit', function(e) {
      e.preventDefault();
      var $input = $(this).find('input[name="text"]'),
          text = $input.val();
      if (! text) { return; }
      $input.val('');
      self.trigger('add', { text: text });
    });
  },
  onItemChange: function() {
    var self = this;
    return function(item) {
      self.trigger('change', { text: item.text, done: item.done, id: item.id });
    };
  },
  render: function(todoItems) {
    React.render(
      <TodoList items={todoItems} onUpdate={this.onItemChange()} />,
      document.getElementsByClassName('list-container')[0]
    );
    React.render(
      <Footer items={todoItems}/>,
      document.getElementsByClassName('footer-container')[0]
    );
  }
});

module.exports = View;
