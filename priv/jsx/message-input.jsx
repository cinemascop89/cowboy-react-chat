var React = require('react');

exports.MessageInput = React.createClass({
    getInitialState: function() {
        return {message: ''};
    },
    handleChange: function(e) {
        this.setState({message: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var msg = this.state.message;
        if (!msg)
            return;
        this.props.onSubmit(msg);
        this.setState({message: ''});
    },
    render: function() {
        return (
            <div className="message-input">
                <span className="username">{this.props.username}</span>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.message}
                           onChange={this.handleChange}
                           placeholder="Say something!"/>
                </form>
            </div>
        );
    }
});
