var React = require('react');

exports.Message = React.createClass({
    formatTimeStamp: function(ts) {
        var date = new Date(ts);
        return "[" + date.getMinutes() + ":" + date.getSeconds() + "]";
    },
    render: function() {
        var timestamp = this.formatTimeStamp(this.props.timestamp);
        return (
            <div className="message">
                <span className="timestamp">{timestamp}</span>
                <span className="author">{this.props.author}</span>
                <span className="content">{this.props.content}</span>
            </div>
        );
    }
})
