var React = require('react');

exports.Websocket = React.createClass({
    handleOpen: function() {
        this.props.onConnect();
    },
    handleMessage: function(event) {
        this.props.onEvent(JSON.parse(event.data));
    },
    componentDidMount: function() {
        var socket = new WebSocket("ws://127.0.0.1:8080/chat");
        socket.onopen = this.handleOpen;
        socket.onmessage = this.handleMessage;
        this.setState({socket: socket});
    },
    sendJoin(username) {
        var msg = JSON.stringify({
            event: "join",
            data: username
        });
        this.state.socket.send(msg);
    },
    sendMessage(content) {
        var msg = JSON.stringify({
            event: "message",
            data: content
        });
        this.state.socket.send(msg);
    },
    render: function() {
        return null;
    }
});
