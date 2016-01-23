var React = require('react');
var ReactDOM = require('react-dom');
var Chat = require('./chat.jsx').Chat;

window.React = React;

ReactDOM.render(
    <Chat />, document.getElementById('app')
);
