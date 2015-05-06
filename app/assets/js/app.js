'use strict';

var React = require('react');
var TodoList = require('./components/TodoList.jsx');
var Footer = require('./components/Footer.jsx');
var todoStore = require('./stores/todoStore');
var actionCreator = require('./actions/actionCreator');
var $ = require('jquery');
require('./sync');

todoStore.set(window.state.todoItems);

React.render(
  <TodoList />,
  document.getElementsByClassName('list-container')[0]
);

React.render(
  <Footer />,
  document.getElementsByClassName('footer-container')[0]
);

$('.form').on('submit', function(e) {
  e.preventDefault();
  var $input = $(this).find('input');
  var val = $input.val();
  if (! val) { return; }
  var tmpId = Math.random().toString(36).substr(2, 7);
  actionCreator.create('addItem', val, tmpId);
  $input.val('');
});
