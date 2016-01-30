var React = require('react');
var Message = require('./message.jsx').Message;

exports.MessageHistory = React.createClass({
    render: function() {
        var messages = this.props.messages.map(function(msg) {
            return (
                <Message timestamp={msg.timestamp}
                         author={msg.author}
                         content={msg.content}/>
            );
        });
        return (
            <div className="messages">
                {messages}
            </div>
        );
    }
});
