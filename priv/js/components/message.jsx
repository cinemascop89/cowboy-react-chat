var React = require('react');

exports.Message = React.createClass({
    formatTimeStamp: function(ts) {
        var date = new Date(ts);
        var minutes = date.getMinutes();
        if (minutes < 10)
            minutes = "0" + minutes;
        var seconds = date.getSeconds();
        if (seconds < 10)
            seconds = "0" + seconds;
        return `[${minutes}:${seconds}]`;
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
