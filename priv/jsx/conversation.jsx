var React = require('react');
var MessageHistory = require('./message-history.jsx').MessageHistory;
var MessageInput = require('./message-input.jsx').MessageInput;

exports.Conversation = React.createClass({
    handleSubmit: function(message) {
        this.props.onSubmit(message);
    },
    render: function() {
        return (
            <div className="conversation">
                <MessageHistory messages={this.props.history} />
                <MessageInput
                    username={this.props.username}
                    onSubmit={this.handleSubmit} />
            </div>
        );
    }
});
